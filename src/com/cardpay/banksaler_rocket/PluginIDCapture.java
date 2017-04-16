package com.cardpay.banksaler_rocket;

import org.json.JSONArray;
import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

import Utils.Util;
import android.content.Intent;
import android.os.Handler;
import android.os.Message;
import android.util.Log;

public class PluginIDCapture extends Plugin {

	private Object synObj = new Object();
	private String resultFunction = null;

	@Override
	public PluginResult execute(String arg0, JSONArray arg1, String arg2) {
		Log.v("PLUGIN", "PLUGIN EXECUTE");
		handler.sendEmptyMessage(1);  
        sleep();
        
		return new PluginResult(PluginResult.Status.OK, resultFunction);
	}

	private Handler handler = new Handler() {
		public void handleMessage(Message msg) {
			if (msg == null) {
				return;
			}
			switch (msg.what) {
			case 1:
				try {
					Log.v("START", "START");
					Intent intent = new Intent(ctx, PluginIDCaptureActivity.class);
					ctx.startActivityForResult(PluginIDCapture.this, intent, 0);
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			}
		};
	};

	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		super.onActivityResult(requestCode, resultCode, intent);
		if (requestCode == 0) {
			String msg = intent.getStringExtra(Util.EXTRA_ID_PATH) + "###" + intent.getStringExtra(Util.EXTRA_FACE_PATH);
			Log.v("FLAG", "IN WRAPPER " + msg);
			resultFunction = msg;
			
			super.onActivityResult(requestCode, resultCode, intent);
			weakup();
		}
	}
	
	private void sleep()
    {
        try
        {
            synchronized(synObj)
            {
                synObj.wait();
            }
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
    }
    
    private void weakup()
    {
        synchronized(synObj)
        {
            synObj.notify();
        }
    }
    
}
