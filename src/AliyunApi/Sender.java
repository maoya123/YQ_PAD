package AliyunApi;

import java.io.File;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;

import com.cardpay.banksaler_rocket.PluginIDCaptureTanwhActivity;

import android.util.Base64;
import android.util.Log;

public class Sender {

	private static final String TAG = Sender.class.getSimpleName();

	public static String send(String imgPath) {
		String host = "http://114.55.251.223:8098/IDCardIdentify";
		Map<String, String> headers = new HashMap<String, String>();
		// 根据API的要求，定义相对应的Content-Type
		headers.put("Content-Type", "application/json; charset=UTF-8");
		String encodedString = null;
		try {
			File file = new File(imgPath);
			FileInputStream inputFile = null;
			try {
				inputFile = new FileInputStream(file);
				byte[] buffer = new byte[(int) file.length()];
				inputFile.read(buffer);
				inputFile.close();
				encodedString = Base64.encodeToString(buffer, Base64.NO_WRAP);
				//Log.e(TAG, "Base64---->" + encodedString);
			} catch (Exception e) {
				e.printStackTrace();
			}

			String bodys = "{\"photo\":\"" + encodedString + "\"}";
			//Log.i(TAG, "Base64---->" + encodedString);
			String response = HttpUtils.submitPostData(host, bodys);
			// System.out.println(response.toString());
			return convertUnicode(response.toString());

			// 获取response的body
			// System.out.println(EntityUtils.toString(response.getEntity()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String convertUnicode(String ori) {
		char aChar;
		int len = ori.length();
		StringBuffer outBuffer = new StringBuffer(len);
		for (int x = 0; x < len;) {
			aChar = ori.charAt(x++);
			if (aChar == '\\') {
				aChar = ori.charAt(x++);
				if (aChar == 'u') {
					// Read the xxxx
					int value = 0;
					for (int i = 0; i < 4; i++) {
						aChar = ori.charAt(x++);
						switch (aChar) {
						case '0':
						case '1':
						case '2':
						case '3':
						case '4':
						case '5':
						case '6':
						case '7':
						case '8':
						case '9':
							value = (value << 4) + aChar - '0';
							break;
						case 'a':
						case 'b':
						case 'c':
						case 'd':
						case 'e':
						case 'f':
							value = (value << 4) + 10 + aChar - 'a';
							break;
						case 'A':
						case 'B':
						case 'C':
						case 'D':
						case 'E':
						case 'F':
							value = (value << 4) + 10 + aChar - 'A';
							break;
						default:
							throw new IllegalArgumentException(
									"Malformed   \\uxxxx   encoding.");
						}
					}
					outBuffer.append((char) value);
				} else {
					if (aChar == 't')
						aChar = '\t';
					else if (aChar == 'r')
						aChar = '\r';
					else if (aChar == 'n')
						aChar = '\n';
					else if (aChar == 'f')
						aChar = '\f';
					outBuffer.append(aChar);
				}
			} else
				outBuffer.append(aChar);

		}
		return outBuffer.toString();
	}

	public static void main(String[] args) {
		new Sender().send("D:/img_858840.jpg");
	}
}
