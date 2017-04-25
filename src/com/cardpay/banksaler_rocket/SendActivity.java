package com.cardpay.banksaler_rocket;


import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.squareup.picasso.Picasso;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.widget.ImageView;
/*	@descript 实现滑动切换图片
 *  @Date 2014-8-4
 *  @come：http://www.cnblogs.com/tinyphp/p/3890769.html
 */
import android.widget.Toast;

public class SendActivity extends Activity implements  android.view.GestureDetector.OnGestureListener{
private ArrayList<View> pageview;
List list =new ArrayList();
private  String ImaURL="http://192.168.191.1:8080/PCCredit/ipad/pccustormer/ckpcImageById.json?userId=0&id=";
ImageView images;
//定义手势检测器实例
	GestureDetector detector;
	Integer imaCount=0;
	String[] imagesUrl;
	static ImageResult result=new ImageResult();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //设置无标题栏
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_send);
        String name = (String) getIntent().getExtras().get("name");
		String b="1";
		if(!name.equals(b) && name.equals("2")){
         images=(ImageView) findViewById(R.id.imagess);
         String url=ImaList.getIma();
         imagesUrl=url.split(",");
         for(int a=0;a<imagesUrl.length;a++){
        	 list.add(imagesUrl[a]) ;
         }
        String imageUrl=(String) list.get(0);
       Picasso.with(this).load(ImaURL+imageUrl).resize(50,50)
        .into(images);
        //创建手势检测器
        detector = new GestureDetector(this,this);
		
		}else if(!name.equals(b) && name.equals("3")){
			 images=(ImageView) findViewById(R.id.imagess);
	         String url=ImaList.getIma();
	         Picasso.with(this).load(ImaURL+url)
	         .into(images);
	         images.setOnClickListener(new OnClickListener() {//按键单击事件  
	        	 @Override  
	        	 public void onClick(View v) {  
	        	     // TODO Auto-generated method stub  
	        	     new AlertDialog.Builder(SendActivity.this).setTitle("系统提示")
	        	     .setMessage("确定删除此张照片？")//设置显示的内容  
	        	     .setPositiveButton("确定",new DialogInterface.OnClickListener() {
	        	         @Override  
	        	         public void onClick(DialogInterface dialog, int which) {
	        	        	 result.setId("1");
	        	        	 new Thread() {
	        	                 @Override
	        	                 public void run() {
	        	                     super.run();
	        	                     try {
										Thread.sleep(700);
									} catch (InterruptedException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}//休眠3秒
	        	                     /**
	        	                      * 要执行的操作
	        	                      */
	        	                     result.setId("");
	        	                     finish();  
	        	                              }
	        	             }.start();
	        	             
	        	         }  
	        	  
	        	     }).setNegativeButton("返回",new DialogInterface.OnClickListener() {  
	        	         @Override  
	        	         public void onClick(DialogInterface dialog, int which) {
	        	             // TODO Auto-generated method stub  
	        	        	 result.setId("0");
	        	        	 new Thread() {
	        	                 @Override
	        	                 public void run() {
	        	                     super.run();
	        	                     try {
										Thread.sleep(700);
									} catch (InterruptedException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}//休眠3秒
	        	                     /**
	        	                      * 要执行的操作
	        	                      */
	        	                     result.setId("");
	        	                     finish();  
	        	                              }
	        	             }.start();
	        	         }  
	        	  
	        	     }).show();
	        	  
	        	      
	        	  
	        	 }  
	        });
		}
			else{
        	AppManager.getInstance().addActivity(this);
			finish();
        }
    }

  
    //将该activity上的触碰事件交给GestureDetector处理
    public boolean onTouchEvent(MotionEvent me){
    	return detector.onTouchEvent(me);
    }
    
	@Override
	public boolean onDown(MotionEvent arg0) {
		return false;
	}

	/**
	 * 滑屏监测
	 * 
	 */
	@Override
	public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
			float velocityY) {
		float minMove = 120;         //最小滑动距离
		float minVelocity = 0;      //最小滑动速度
		float beginX = e1.getX();     
		float endX = e2.getX();
		float beginY = e1.getY();     
		float endY = e2.getY();

			if(beginX-endX>minMove&&Math.abs(velocityX)>minVelocity){
				
				//左滑
				if(imaCount<=list.size()-2){
					imaCount=imaCount+1;
					 String imageUrl=(String) list.get(imaCount);
					 Picasso.with(this).load(ImaURL+imageUrl)
				        .into(images);}else{
				        	imaCount=list.size()-1;
				        	String imageUrl=(String) list.get(imaCount);
				        	 Picasso.with(this).load(ImaURL+imageUrl)
				             .into(images);
				        	Toast.makeText(this, "最后一张",Toast.LENGTH_SHORT).show();
				        }
			}else if(endX-beginX>minMove&&Math.abs(velocityX)>minVelocity){   //右滑
			if(imaCount>=1){
				imaCount=imaCount-1;
				 String imageUrl=(String) list.get(imaCount);
				 Picasso.with(this).load(ImaURL+imageUrl)
			        .into(images);;
			}else{
				 String imageUrl=(String) list.get(0);
				 Picasso.with(this).load(ImaURL+imageUrl)
			        .into(images);
			        Toast.makeText(this,"第一张",Toast.LENGTH_SHORT).show();
			}
			}else if(beginY-endY>minMove&&Math.abs(velocityY)>minVelocity){   //上滑
				if(imaCount<=list.size()-2){
					imaCount=imaCount+1;
					 String imageUrl=(String) list.get(imaCount);
					 Picasso.with(this).load(ImaURL+imageUrl)
				        .into(images);}else{
				        	imaCount=list.size()-1;
				        	String imageUrl=(String) list.get(imaCount);
				        	 Picasso.with(this).load(ImaURL+imageUrl)
				             .into(images);
				        	Toast.makeText(this, "最后一张",Toast.LENGTH_SHORT).show();
				        }
			}else if(endY-beginY>minMove&&Math.abs(velocityY)>minVelocity){   //下滑
				if(imaCount>=1){
					imaCount=imaCount-1;
					 String imageUrl=(String) list.get(imaCount);
					 Picasso.with(this).load(ImaURL+imageUrl)
				        .into(images);;
				}else{
					 String imageUrl=(String) list.get(0);
					 Picasso.with(this).load(ImaURL+imageUrl)
				        .into(images);
				        Toast.makeText(this,"第一张",Toast.LENGTH_SHORT).show();
				}
			}
		
		
		return false;
	}

	@Override
	public void onShowPress(MotionEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean onSingleTapUp(MotionEvent arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onLongPress(MotionEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean onScroll(MotionEvent e1, MotionEvent e2, float velocityX,
			float velocityY) {
	
		return false;
	}
	public static void ShowImg(String uri, ImageView iv) throws IOException {    
        FileInputStream fs = new FileInputStream(uri); 
        BufferedInputStream bs = new BufferedInputStream(fs); 
        Bitmap btp = BitmapFactory.decodeStream(bs); 
        iv.setImageBitmap(btp); 
        bs.close(); 
        fs.close(); 
        btp = null;      
}


}
