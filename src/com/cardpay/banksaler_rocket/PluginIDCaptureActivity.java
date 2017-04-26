package com.cardpay.banksaler_rocket;

import AliyunApi.Sender;
import Utils.FaceDetector;
import Utils.OpenCVLoader;
import Utils.TessTwo;
//import Utils.OpenCVLoader;
import Utils.Util;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.BitmapFactory;
import android.graphics.BitmapRegionDecoder;
import android.graphics.Matrix;
//import android.graphics.Rect;
import android.hardware.Camera;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.provider.MediaStore;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.util.Log;
import android.view.KeyEvent;
import android.view.SurfaceView;
import android.view.View;
import android.view.View.OnClickListener;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.Thread.UncaughtExceptionHandler;

import com.googlecode.tesseract.android.TessBaseAPI;

import org.opencv.android.BaseLoaderCallback;
import org.opencv.android.CameraBridgeViewBase;
import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.imgproc.Imgproc;

public class PluginIDCaptureActivity extends Activity implements
		CameraBridgeViewBase.CvCameraViewListener2, UncaughtExceptionHandler {
	private static final String TAG = PluginIDCaptureActivity.class
			.getSimpleName();

	private Button btn;
	private int flag = 0;
	private Intent intentNew = null;
	private Context context = this;

	private Button mTakePicBtn;
	private Camera mCameraInstance;
	private View mScanV;

	// 扫描区域属性
	private int mScaLeft;
	private int mScanTop;
	private int mScanRight;
	private int mScanBottom;
	private int mScanWidth;
	private int mScanHeight;
	private FrameLayout mSurfaceContainerFl;

	private static final String TESSBASE_PATH = "/mnt/sdcard/tesseract/";
	private static final String DEFAULT_LANGUAGE = "eng";
	private static final String CHINESE_LANGUAGE = "chi_sim"; // chi_tra chi_sim

	private Button mCaptureButton;

	private CameraBridgeViewBase mOpenCvCameraView;

	private FaceDetector mDetector;

	private Scalar mCaptureRangeColor = new Scalar(255, 255, 255);
	private Rect mCaptureRange;
	private Rect mIdNumCaptureRange;
	private Rect mTextCaptureRange;

	// to get the largest resolution for best quality
	int mMaxFrameWidth = 2560;
	int mMaxFrameHeight = 1440;

	// private Mat mLastFrame = null;
	// private Mat mLastFrameFace = null;
	private Bitmap mLastFrame = null;
	private Bitmap mLastFrameFace = null;
	private Bitmap mLastFrameText = null;
	private Bitmap mLastFrameNumber = null;
	private Intent mIntent;

	private HandlerThread mHt;
	private Handler mHandler;
	private boolean mHandlerFree = true;

	static {
		OpenCVLoader.load();
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.id_capture);

		Thread.setDefaultUncaughtExceptionHandler(this);

		// getViews();
		// setViews();
		// setListeners();

		initCaptureButton();

		intentNew = this.getIntent();

		/*
		 * btn = (Button) findViewById(R.id.btn_take_pic);
		 * btn.setOnClickListener(new OnClickListener(){ public void
		 * onClick(View v) { flag = 1; Log.v("FLAG","1 IN PLUGIN"); //intentNew
		 * = ((Activity) context).getIntent();
		 * 
		 * intentNew.putExtra("returnedData", Integer.toString(flag)); if
		 * (getParent() == null) { setResult(RESULT_OK, intentNew); } else {
		 * getParent().setResult(RESULT_OK, intentNew); } finish(); } });
		 */

		try {
			TessTwo.init(PluginIDCaptureActivity.this);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		mOpenCvCameraView = (CameraBridgeViewBase) findViewById(R.id.v_scan);
		mOpenCvCameraView.setVisibility(SurfaceView.VISIBLE);
		mOpenCvCameraView.setCvCameraViewListener(this);
		mOpenCvCameraView.enableView();
		mOpenCvCameraView.setMaxFrameSize(mMaxFrameWidth, mMaxFrameHeight);
		// mOpenCvCameraView.enableFpsMeter();

		mDetector = FaceDetector.getInstance(this);

		mHt = new HandlerThread("IDCapture");
		mHt.start();
		mHandler = new Handler(mHt.getLooper());

	}

	private void getViews() {
		mSurfaceContainerFl = (FrameLayout) findViewById(R.id.fl_surfaceview_container);

		mScanV = findViewById(R.id.v_scan);
		mTakePicBtn = (Button) findViewById(R.id.btn_take_pic);
		mCameraInstance = getCameraInstance();
		CameraSurfaceView mSurfaceView = new CameraSurfaceView(this,
				mCameraInstance);
		mSurfaceContainerFl.addView(mSurfaceView);
	}

	private Camera getCameraInstance() {
		if (!getPackageManager()
				.hasSystemFeature(PackageManager.FEATURE_CAMERA)) {
			Log.e(TAG, "this device has no camera!");
			return null;
		}
		Camera camera = null;
		try {
			camera = Camera.open();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return camera;
	}

	private void setViews() {
		mScanV.post(new Runnable() {
			@Override
			public void run() {
				mScaLeft = mScanV.getLeft();
				mScanTop = mScanV.getTop();
				mScanRight = mScanV.getRight();
				mScanBottom = mScanV.getBottom();
				mScanWidth = mScanV.getWidth();
				mScanHeight = mScanV.getHeight();
				Log.i(TAG, "getleft value:" + mScaLeft);
				Log.i(TAG, "gettop value:" + mScanTop);
				Log.i(TAG, "getright value:" + mScanRight);
				Log.i(TAG, "getbottom value:" + mScanBottom);
				Log.i(TAG, "getwidth value:" + mScanWidth);
				Log.i(TAG, "getheight value:" + mScanHeight);
			}
		});
	}

	@Override
	public void uncaughtException(Thread arg0, Throwable arg1) {
		arg1.printStackTrace();
		Log.i("AAA", "uncaughtException   " + arg1);
	}

	/*
	 * private void setListeners() { mTakePicBtn.setOnClickListener(this); }
	 * 
	 * @Override public void onClick(View v) { switch (v.getId()) { case
	 * R.id.btn_take_pic:
	 *//**
	 * 拍照并识别身份证，还有一种方式是previewcallback方式，周期性获取某一帧图片解析
	 * 判断是否解析成功的方法是判断身份证是否包含wrong number字符串，因为解析身份证错误时 会包含这个字符串
	 * */
	/*
	 * takePic(); break; } }
	 */

	private void takePic() {

		mCameraInstance.takePicture(null, null, new Camera.PictureCallback() {
			@Override
			public void onPictureTaken(byte[] data, Camera camera) {
				// Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0,
				// data.length);
				/**
				 * 图片截取的原理，我们预览surfaceview是全屏的，扫描区域是屏幕中的一部分.所以最终
				 * 需要截取图片，但是有一些需要注意的问题。 因为拍照图片尺寸跟扫描框父窗体尺寸是不一样的
				 * 要先缩放照片尺寸与扫描框父窗体一样在进行裁剪 另外还有一个问题，一定要设置预览分辨率否则拍摄照片是变形的。
				 * 预览的坐标是横屏的xy轴坐标，所以如果是竖屏对图片处理时需要先做旋转操作
				 * 分辨率设置方法是获取设备支持的预览分辨率利用最小差值法获取最优分辨率并设置
				 * 还有一种解决办法有人说是是设置拍照图片分辨率和预览分辨率，我没有尝试。
				 * */
				BitmapFactory.Options options = new BitmapFactory.Options();
				options.inJustDecodeBounds = true;
				BitmapFactory.decodeByteArray(data, 0, data.length, options);
				options.inJustDecodeBounds = false;

				try {
					int outWidth = options.outWidth;
					int outHeight = options.outHeight;
					int count = outHeight + outWidth;
					int bitmapW = outWidth < outHeight ? outWidth : outHeight;
					int bitmapH = count - bitmapW;
					float difW = (float) mSurfaceContainerFl.getWidth()
							/ bitmapW;
					float difH = (float) mSurfaceContainerFl.getHeight()
							/ bitmapH;

					Matrix matrix = new Matrix();
					android.hardware.Camera.CameraInfo info = new android.hardware.Camera.CameraInfo();
					android.hardware.Camera.getCameraInfo(0, info);
					matrix.postRotate(info.orientation);
					// matrix.postScale(difW,difH);

					Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0,
							data.length);

					double percentX = (double) mSurfaceContainerFl.getWidth()
							/ (double) bitmap.getWidth();
					double percentY = (double) mSurfaceContainerFl.getHeight()
							/ (double) bitmap.getHeight();
					Bitmap scaleBitmap = Bitmap.createBitmap(bitmap, 0, 0,
							bitmap.getWidth(), bitmap.getHeight(), matrix, true);

					// 图片截取两种方式，createbitmap或者bitmapRegionDecoder
					ByteArrayOutputStream bos = new ByteArrayOutputStream();
					scaleBitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
					// saveImage(scaleBitmap);
					android.graphics.Rect rect = new android.graphics.Rect(
							(int) (mScaLeft / percentX),
							(int) (mScanTop / percentY),
							(int) (mScanRight / percentX),
							(int) (mScanBottom / percentY));
					byte[] bitmapBytes = bos.toByteArray();
					BitmapRegionDecoder decoder = BitmapRegionDecoder
							.newInstance(bitmapBytes, 0, bitmapBytes.length,
									false);
					Bitmap cropBtimap = decoder.decodeRegion(rect, options);

					ByteArrayOutputStream cropStream = new ByteArrayOutputStream();
					cropBtimap.compress(Bitmap.CompressFormat.JPEG, 100,
							cropStream);
					saveImage(cropBtimap);

					//getText(cropBtimap);

				} catch (IOException e) {
					e.printStackTrace();
				}
				mCameraInstance.startPreview();

			}
		});
	}

	private String getText(Bitmap cropBtimap) {
		TessBaseAPI baseApi = new TessBaseAPI();
		File appDir = new File(TESSBASE_PATH);
		Log.i("appDir", appDir.getAbsolutePath());
		baseApi.init(appDir.getAbsolutePath(), CHINESE_LANGUAGE);

		Bitmap bitmapGray = ImageFilter.grayScaleImage(cropBtimap);// 图片灰度化
		baseApi.setImage(bitmapGray);

		final String outputText = baseApi.getUTF8Text();
		Log.i("号码是", outputText);
		baseApi.end();
		return outputText;
	}

	private void saveImage(Bitmap bmp) {
		File appDir = new File(Environment.getExternalStorageDirectory(),
				"PCCredit");
		if (!appDir.exists()) {
			appDir.mkdir();
		}
		String fileName = System.currentTimeMillis() + ".jpg";
		File file = new File(appDir, fileName);
		try {
			FileOutputStream fos = new FileOutputStream(file);
			bmp.compress(CompressFormat.JPEG, 100, fos);
			fos.flush();
			fos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// 其次把文件插入到系统图库
		try {
			MediaStore.Images.Media.insertImage(context.getContentResolver(),
					file.getAbsolutePath(), fileName, null);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		// 最后通知图库更新
		context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE,
				Uri.fromFile(new File(file.getPath()))));
	}

	private Bitmap rotatedBitmap(Bitmap sourceBitmap, int orientation) {
		Matrix matrix = new Matrix();
		matrix.postRotate(270);
		return Bitmap.createBitmap(sourceBitmap, 0, 0, sourceBitmap.getWidth(),
				sourceBitmap.getHeight(), matrix, true);
	}

	private void initCaptureButton() {
		mCaptureButton = (Button) findViewById(R.id.btn_take_pic);
		if (mCaptureButton == null) {
			return;
		}
		setCaptureEnable(false);
		mCaptureButton.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				onCapture();
			}
		});
	}

	private void onCapture() {
		if (!faceExistsInLastFrame()) {
			return;
		}
		new Thread(new Runnable() {
			@Override
			public void run() {

				mHt.quit();

				Util.idcard = mLastFrame;
				Util.storeBitmapToStorage(context,Util.idcard);
				// intentNew.putExtra(EXTRA_FACE, mLastFrameFace);
				// Util.textBitmap = mLastFrameText;
				Util.idBitmap = mLastFrameNumber;
				//intentNew.putExtra(Util.EXTRA_ID, Util.idBitmap);
				// Util.storeBitmapToStorage(context,Util.textBitmap);
				
				String idpath = Util.storeBitmapToStorage(context,Util.idBitmap).getPath();
				String idinfo = new Sender().send(idpath);
				//intentNew.putExtra(Util.EXTRA_ID_PATH, idpath);
				intentNew.putExtra(Util.EXTRA_ID_INFO, idinfo);
				
				//String facepath = Util.storeBitmapToStorage(context,mLastFrameFace).getPath();
				//intentNew.putExtra(Util.EXTRA_FACE_PATH, facepath);
				
				//异步识别
				/*
				new Thread(new Runnable() {
					@Override
					public void run() {
						final String str = TessTwo
								.getText(Util.idBitmap);
					}
				}).start();
				*/
				if (getParent() == null) {
					setResult(RESULT_OK, intentNew);
				} else {
					getParent().setResult(RESULT_OK, intentNew);
				}
				finish();
				/*
				 * setResult(RESULT_OK, intentNew); runOnUiThread(new Runnable()
				 * {
				 * 
				 * @Override public void run() { finish(); } });
				 */
			}
		}).start();

	}

	private void setCaptureEnable(final boolean enable) {
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				mCaptureButton.setEnabled(enable);
			}
		});

	}

	@Override
	public void onCameraViewStarted(int width, int height) {

	}

	@Override
	public void onCameraViewStopped() {

	}

	private boolean faceExistsInLastFrame() {
		return mLastFrameFace != null;
	}

	@Override
	public Mat onCameraFrame(
			final CameraBridgeViewBase.CvCameraViewFrame inputFrame) {

		Mat frame = new Mat();
		inputFrame.rgba().copyTo(frame);
		if (mHt.isAlive() && mHandlerFree) {
			mHandler.post(new Runnable() {
				@Override
				public void run() {
					try {
						mHandlerFree = false;

						if (!mHt.isAlive()) {
							return;
						}

						Log.i("thread", "thread is running");
						Mat grayFrame = inputFrame.gray();
						Mat rgbFrame = inputFrame.rgba().clone();
						Mat captureRangeFrame = new Mat(grayFrame,
								mCaptureRange);
						Rect[] faceArray = mDetector
								.detectFaceByFrame(captureRangeFrame);

						if (faceArray != null && faceArray.length == 1) {
							Mat rgbRange = Util.getMatFromRect(rgbFrame,
									mCaptureRange);
							mLastFrameFace = Util.getBitmapFromRect(rgbRange,
									faceArray[0]);
							mLastFrame = Util.cvtMat2Bitmap(rgbRange);
							mLastFrameText = Util.getBitmapFromRect(grayFrame,
									mTextCaptureRange);
							mLastFrameNumber = Util.getBitmapFromRect(
									grayFrame, mIdNumCaptureRange);

							runOnUiThread(new Runnable() {
								@Override
								public void run() {
									Log.i(TAG, "获取到有效帧");
									setCaptureEnable(true);
								}
							});

						}
						mHandlerFree = true;

					} catch (Exception e) {
						e.printStackTrace();
						Toast.makeText(context, "无法读取有效帧，请返回重试！", Toast.LENGTH_LONG).show();
					}

				}
			});
		}

		// draw rectangle
		initCaptureRange(frame.width(), frame.height());
		drawRectToFrame(frame, mCaptureRange);
		drawRectToFrame(frame, mIdNumCaptureRange);
		// drawRectToFrame(frame, mTextCaptureRange);

		return frame;
	}

	private void initCaptureRange(int frameWidth, int frameHeight) {
		float width = frameWidth * 0.75f;
		float height = frameHeight * 0.6f;
		float x = frameWidth * 0.08f;
		float y = frameHeight * 0.2f;

		mCaptureRange = new Rect((int) x, (int) y, (int) width, (int) height);

		float numWidth = width * 0.8f;
		float numHeight = height * 0.13f;
		float numX = x + width * 0.1f;
		float numY = y + height * 0.8f;

		mIdNumCaptureRange = new Rect((int) numX, (int) numY, (int) numWidth,
				(int) numHeight);

		float textWidth = width * 0.5f;
		float textHeight = height * 0.6f;
		float textX = x + width * 0.14f;
		float textY = y + height * 0.1f;

		mTextCaptureRange = new Rect((int) textX, (int) textY, (int) textWidth,
				(int) textHeight);
	}

	private void drawRectToFrame(Mat frame, Rect rect) {
		Point startPoint = new Point(rect.x, rect.y);
		Point endPoint = new Point(rect.x + rect.width, rect.y + rect.height);
		Imgproc.rectangle(frame, startPoint, endPoint, mCaptureRangeColor, 2);
	}

	// OpenCV库加载并初始化成功后的回调函数
	private BaseLoaderCallback mLoaderCallback = new BaseLoaderCallback(this) {

		@Override
		public void onManagerConnected(int status) {
			// TODO Auto-generated method stub
			switch (status) {
			case BaseLoaderCallback.SUCCESS:
				Log.i(TAG, "成功加载");
				break;
			default:
				super.onManagerConnected(status);
				Log.i(TAG, "加载失败");
				break;
			}

		}
	};

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event)  {
	    if (keyCode == KeyEvent.KEYCODE_BACK && event.getRepeatCount() == 0) { //按下的如果是BACK，同时没有重复
	    	if (getParent() == null) {
				setResult(RESULT_OK, intentNew);
			} else {
				getParent().setResult(RESULT_OK, intentNew);
			}
			finish();
	        return true;
	    }

	    return super.onKeyDown(keyCode, event);
	}
}
