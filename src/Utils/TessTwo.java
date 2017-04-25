package Utils;

import android.app.Activity;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.os.Environment;
import android.util.Log;

import com.cardpay.banksaler_rocket.ImageFilter;
import com.googlecode.tesseract.android.TessBaseAPI;
import com.googlecode.tesseract.android.TessBaseAPI.PageSegMode;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by han on 2017/3/29.
 */

public class TessTwo {
    private static final String DATA_PATH = Environment
            .getExternalStorageDirectory().toString() + "/";

    private static final String TAG = "Tess-Two";
    private static final String TESSBASE_PATH = "/mnt/sdcard/tesseract/";   
    private static final String LANG_ZH = "chi_sim";

    public static void init(Activity activity) throws IOException {
        /*File dir = new File(DATA_PATH);
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                Log.v(TAG, "ERROR: Creation of directory " + DATA_PATH + " on sdcard failed");
                return;
            } else {
                Log.v(TAG, "Created directory " + DATA_PATH + " on sdcard");
            }
        }

        if (!(new File(DATA_PATH  + LANG_ZH + ".traineddata")).exists()) {
            try {

                AssetManager assetManager = activity.getAssets();
                InputStream in = assetManager.open(LANG_ZH + ".traineddata");
                //GZIPInputStream gin = new GZIPInputStream(in);
                OutputStream out = new FileOutputStream(DATA_PATH
                         + LANG_ZH + ".traineddata");

                // Transfer bytes from in to out
                byte[] buf = new byte[1024];
                int len;
                //while ((lenf = gin.read(buff)) > 0) {
                while ((len = in.read(buf)) > 0) {
                    out.write(buf, 0, len);
                }
                in.close();
                //gin.close();
                out.close();

                Log.v(TAG, "Copied " + LANG_ZH + " traineddata");
            } catch (IOException e) {
                Log.e(TAG, "Was unable to copy " + LANG_ZH + " traineddata " + e.toString());
            }
        }*/
    }

    public static String parseImageToString(Bitmap bitmap)
    {
        // 图片旋转角度
        int rotate = 0;

        // 获取当前图片的宽和高
        int w = bitmap.getWidth();
        int h = bitmap.getHeight();

        // 使用Matrix对图片进行处理
        Matrix mtx = new Matrix();
        mtx.preRotate(rotate);

        // 旋转图片
        bitmap = Bitmap.createBitmap(bitmap, 0, 0, w, h, mtx, false);
        bitmap = bitmap.copy(Bitmap.Config.ARGB_8888, true);

        // 开始调用Tess函数对图像进行识别
        TessBaseAPI baseApi = new TessBaseAPI();
        baseApi.setDebug(true);
        // 使用默认语言初始化BaseApi
        baseApi.init(TESSBASE_PATH, LANG_ZH);
        baseApi.setImage(bitmap);

        // 获取返回值
        String recognizedText = baseApi.getUTF8Text();
        Log.i("1号码是", recognizedText);
        baseApi.end();
        return recognizedText;
    }
    
    public static String getText(Bitmap bitmap){
		TessBaseAPI baseApi = new TessBaseAPI();  
		baseApi.setPageSegMode(PageSegMode.PSM_SINGLE_LINE);
        baseApi.setVariable("classify_bln_numeric_mode", "1");
        baseApi.init(TESSBASE_PATH, LANG_ZH);  
        Bitmap bitmapGray =  ImageFilter.grayScaleImage(bitmap);// 图片灰度化 
        //Util.storeBitmapToStorage(context, bitmapGray)
        bitmapGray = ImageFilter.gray2Binary(bitmapGray);
        baseApi.setImage(bitmapGray);   
        
        final String outputText = baseApi.getUTF8Text();    
        Log.i("2号码是", outputText);
        baseApi.end(); 
        return outputText;
	}
}
