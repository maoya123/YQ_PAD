package Utils;

import android.content.Context;
import android.graphics.Bitmap;
import android.util.Log;

import org.opencv.android.Utils;
import org.opencv.core.Mat;
import org.opencv.core.MatOfRect;
import org.opencv.core.Rect;
import org.opencv.core.Size;
import org.opencv.objdetect.CascadeClassifier;

import com.cardpay.banksaler_rocket.R;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by han on 2017/1/17.
 */

public class FaceDetector {

    private static FaceDetector mInstance;

    private CascadeClassifier mDetector;
    private Context mContext;

    private double mScaleFactor = 1.08;
    private int mMinNeighbors = 10;
    private int mFlags = 2;
    private Size mMinSize = new Size(0.2, 0.2);
    private Size mMaxSize = new Size();

    public static FaceDetector getInstance(Context context) {
        if (mInstance == null) {
            mInstance = new FaceDetector(context);
        }
        return mInstance;
    }

    private FaceDetector(Context context) {
        mContext = context;
        initInstance();
    }

    public Rect[] detectFaceByFrame(Mat frame) {
        MatOfRect faces = new MatOfRect();
        mDetector.detectMultiScale(frame, faces, mScaleFactor, mMinNeighbors, mFlags, mMinSize, mMaxSize);
//        Log.v("qwe","get face : " + faces.toArray().length);
        return faces.toArray();
    }

    public Bitmap getFaceByFrame(Mat frame){
        Rect[] faceArray = detectFaceByFrame(frame);
        if(faceArray != null && faceArray.length == 1){
            return Util.cvtMat2Bitmap(Util.getMatFromRect(frame, faceArray[0]));
        }
        return null;
    }

    private void initInstance() {
        try {
            InputStream is = mContext.getResources().openRawResource(R.raw.lbpcascade_frontalface);
            File cascadeDir = mContext.getDir("cascade", Context.MODE_PRIVATE);
            File cascadeFile = new File(cascadeDir, "lbpcascade_frontalface.xml");
            FileOutputStream os = new FileOutputStream(cascadeFile);

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }

            mDetector = new CascadeClassifier(cascadeFile.getAbsolutePath());
            is.close();
            os.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Bitmap cvtMat2Bitmap(Mat src) {
        Bitmap bmp = Bitmap.createBitmap(src.cols(), src.rows(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(src, bmp);

        return bmp;
    }

    public static Mat convertGreyImgByFloyd(Mat gray) {
        byte COLOR_WHITE = (byte) 255;
        byte COLOR_BLACK = (byte) 0;

        int width = gray.cols();
        int height = gray.rows();

        byte buff[] = new byte[width * height];
        gray.get(0, 0, buff);

        byte M = (byte) 150;
        int E;

        int length = buff.length;
        for(int i=0;i < length;i++){
            byte G = buff[i];
            if(G > M){
                buff[i] = COLOR_WHITE;
                E = G - COLOR_WHITE;
            }else{
                buff[i] = COLOR_BLACK;
                E = G - COLOR_BLACK;
            }

            if(i + 1 < length){
                buff[i + 1] += E * 7 / 16;
            }
            if(i + width - 1 < length){
                buff[i + width - 1] += E * 3 / 16;
            }
            if(i + width < length){
                buff[i + width] += E * 5 / 16;
            }
            if(i + width + 1 < length){
                buff[i + width + 1] += E * 1 / 16;
            }
        }
        gray.put(0,0,buff);
        return gray;
    }
}
