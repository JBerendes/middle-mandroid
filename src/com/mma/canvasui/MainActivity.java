package com.mma.canvasui;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.api.CordovaInterface;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.LOG;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.widget.Toast;

public class MainActivity extends Activity implements CordovaInterface {
	
    private final ExecutorService threadPool = Executors.newCachedThreadPool();
//    
//    private boolean mAlternateTitle = false;
//    private boolean bound;
//    private boolean volumeupBound;
//    private boolean volumedownBound;
 
	
	public class WebAppInterface {

		Context mContext;

	    /** Instantiate the interface and set the context */
	    WebAppInterface(Context c) {
	        mContext = c;
	    }

	    /** Show a toast from the web page */
//	    @JavascriptInterface
	    public void showToast(String toast) {
	        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
	    }
	}
	
    String TAG = "MainActivity-ActionBarTest";

    // WAT-age
    private CordovaPlugin activityResultCallback;
    private Object activityResultKeepRunning;
    private Object keepRunning;
 
    CordovaWebView mainView;

    @SuppressLint("SetJavaScriptEnabled")
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mainView = (CordovaWebView) findViewById(R.id.webview);
        mainView.getSettings().setJavaScriptEnabled(true);
        mainView.getSettings().setUserAgentString("Android");
        mainView.addJavascriptInterface(new WebAppInterface(this), "AutoFugue");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }

    public void mvLoadUrl()  {
        mainView.loadUrl("file:///android_asset/www/index.html");
        //mainView.loadUrl("http://192.168.10.145:9090/index.html");
    }

    @Override
    public void onStart() {
        super.onStart();
        mainView.getSettings().setDomStorageEnabled(false);
        mainView.getSettings().setDomStorageEnabled(true);
        mvLoadUrl();
    }

    @Override
    public void startActivityForResult(CordovaPlugin command, Intent intent,
            int requestCode) {
        // TODO Auto-generated method stub
        this.activityResultCallback = command;
        this.activityResultKeepRunning = this.keepRunning;

        // If multitasking turned on, then disable it for activities that return results
        if (command != null) {
            this.keepRunning = false;
        }
 
        // Start activity
        super.startActivityForResult(intent, requestCode);
	}

	@Override
	public void setActivityResultCallback(CordovaPlugin plugin) {
		// TODO Auto-generated method stub
		this.activityResultCallback = plugin; 
	}

	@Override
	public Activity getActivity() {
		// TODO Auto-generated method stub
		return this;
	}
	
    /**
     * Called when an activity you launched exits, giving you the requestCode you started it with,
     * the resultCode it returned, and any additional data from it.
     *
     * @param requestCode       The request code originally supplied to startActivityForResult(),
     *                          allowing you to identify who this result came from.
     * @param resultCode        The integer result code returned by the child activity through its setResult().
     * @param data              An Intent, which can return result data to the caller (various data can be attached to Intent "extras").
     */
	@Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        CordovaPlugin callback = this.activityResultCallback;
        if (callback != null) {
            callback.onActivityResult(requestCode, resultCode, intent);
        }
    }
	
	@Override
	public void cancelLoadUrl() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Object onMessage(String id, Object data) {
	        LOG.d(TAG, "onMessage(" + id + "," + data + ")");
	        if ("exit".equals(id)) {
	            super.finish();
	        }
	        return null;

	}

	@Override
	public ExecutorService getThreadPool() {
		return threadPool;
	}
	
	@Override
    /**
     * Called when the system is about to start resuming a previous activity.
     */
    protected void onPause() {
        super.onPause();
 
         // Send pause event to JavaScript
        this.mainView.loadUrl("javascript:try{cordova.fireDocumentEvent('pause');}catch(e){console.log('exception firing pause event from native');};");
 
        // Forward to plugins
        if (this.mainView.pluginManager != null) {
            this.mainView.pluginManager.onPause(true);
        }
    }
 
    @Override
    /**
     * Called when the activity will start interacting with the user.
     */
    protected void onResume() {
        super.onResume();
 
        if (this.mainView == null) {
            return;
        }
 
        // Send resume event to JavaScript
        this.mainView.loadUrl("javascript:try{cordova.fireDocumentEvent('resume');}catch(e){console.log('exception firing resume event from native');};");
 
        // Forward to plugins
        if (this.mainView.pluginManager != null) {
            this.mainView.pluginManager.onResume(true);
        }
 
    }
 
    @Override
    /**
     * The final call you receive before your activity is destroyed.
     */
    public void onDestroy() {
        LOG.d(TAG, "onDestroy()");
        super.onDestroy();
 
        if (this.mainView != null) {
 
            // Send destroy event to JavaScript
            this.mainView.loadUrl("javascript:try{cordova.require('cordova/channel').onDestroy.fire();}catch(e){console.log('exception firing destroy event from native');};");
 
            // Load blank page so that JavaScript onunload is called
            this.mainView.loadUrl("about:blank");
            mainView.handleDestroy();
        }
    }
    @Override
    /**
     * Called when the activity receives a new intent
     **/
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
 
        //Forward to plugins
        if ((this.mainView != null) && (this.mainView.pluginManager != null)) {
            this.mainView.pluginManager.onNewIntent(intent);
        }
    }

	@Override
	public Context getContext() {
		return this;
	}
}
