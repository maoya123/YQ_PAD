package Utils;

import android.util.Log;

/**
 * Created by han on 2017/1/13.
 */

public class OpenCVLoader {
    public static boolean loaded = false;
    public static String TAG = "OpenCVLoader";

    public static void load(){
        if(loaded){
            return;
        }
        if(org.opencv.android.OpenCVLoader.initDebug()){
            Log.v(TAG,"OpenCV init succeed");
            loaded = true;
        }else{
            Log.v(TAG,"OpenCV init failed");
        }
    }
}
