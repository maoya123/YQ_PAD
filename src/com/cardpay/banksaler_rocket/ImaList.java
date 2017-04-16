package com.cardpay.banksaler_rocket;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.phonegap.api.LOG;
import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.gsm.SmsManager;


public class ImaList extends Plugin{
	private static final String SEND="send";
	static String str;
	int count=0;
	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
			try {
				 str= (String) data.get(0);
				 System.out.println("asjflajkfaea"+data.get(1));
				 String[] url=str.split(",");
				 Bundle b = new Bundle();
				 if(data.get(1).equals("0")){
					 count=1;
					 b.putString("name", "2");
				 }else{
					 count=2;
					 b.putString("name", "3");
				 }
				 SendActivity activity=(SendActivity)AppManager.mList.get(1);
				Intent i=new Intent(activity,SendActivity.class);
				 i.putExtras(b);
				activity.startActivity(i);
				if(count==1){
					return null;
				}else if(count==2){
				String id=SendActivity.result.getId();
				if(id==null){
					id="";
				}
				while(id==""){
					id=SendActivity.result.getId();
					if(id!=""){
						break;
					}
				}
				
				PluginResult result;
				if(SEND.equals(action)){
					try {
						JSONObject jsonObj=new JSONObject();
						String content=id;
						System.out.println(id);
						jsonObj.put("target", content);
						result=new PluginResult(PluginResult.Status.OK,jsonObj);
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						result=new PluginResult(PluginResult.Status.JSON_EXCEPTION);
					}
				}else{
					result=new PluginResult(PluginResult.Status.OK.INVALID_ACTION);
				}
				return result;
		
		}
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return null;
	}
	public static String getIma(){
		return str;
	}

}
