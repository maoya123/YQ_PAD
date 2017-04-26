package Utils;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;

import com.googlecode.tesseract.android.TessBaseAPI;

import org.opencv.android.Utils;
import org.opencv.core.Mat;
import org.opencv.core.Rect;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by han on 2017/2/7.
 */

public class Util {

    public static String EXTRA_IDCARD = "idcard_bitmap";
    public static String EXTRA_FACE = "idcard_face_bitmap";
    public static String EXTRA_FACE_PATH = "idcard_face_bitmap_path";
    public static String EXTRA_ID = "idcard_id_bitmap";
    public static String EXTRA_ID_PATH = "idcard_id_bitmap_path";
    public static String EXTRA_ID_INFO = "idcard_id_info";
    
    public static Bitmap idcard;
    // 黑白照片
    public static Bitmap textBitmap;
    public static Bitmap idBitmap;


    public static File storeBitmapToStorage(final Context context,final Bitmap bitmap) {

        String extStorageDirectory = Environment.getExternalStorageDirectory()
                .toString();
        File dir = new File(extStorageDirectory + "/PCCredit");
        if (!dir.exists()) {
            dir.mkdir();
        }
        final File file = new File(dir, bitmap.toString() + ".png");

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    OutputStream outStream = new FileOutputStream(file);
                    ByteArrayOutputStream byteOutPutStream;

                    int QUALITY = 100;
                    int MAX_SIZE = 500 * 1024;
                    do{
                        Log.v("compress","now quailty is " + QUALITY);

                        byteOutPutStream = new ByteArrayOutputStream();
                        byteOutPutStream.flush();
                        byteOutPutStream.reset();

                        bitmap.compress(Bitmap.CompressFormat.JPEG, QUALITY, byteOutPutStream);
                        QUALITY -= 1;

                        Log.v("compress","now size is " + byteOutPutStream.toByteArray().length / 1024 + "KB");


                    }while(byteOutPutStream.toByteArray().length > MAX_SIZE && QUALITY > 5);

                    outStream.write(byteOutPutStream.toByteArray());
                    outStream.flush();
                    outStream.close();
                    

            	    // 最后通知图库更新
            	    context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,Uri.fromFile(new File(file.getPath()))));

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

        return file;
    }

    public static Bitmap cvtMat2Bitmap(Mat src) {
        Bitmap bmp = Bitmap.createBitmap(src.cols(), src.rows(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(src, bmp);

        return bmp;
    }

    public static Mat getMatFromRect(Mat src, Rect rect){
        return new Mat(src, rect);
    }

    public static Bitmap getBitmapFromRect(Mat src, Rect rect){
        return cvtMat2Bitmap(getMatFromRect(src, rect));
    }


}
