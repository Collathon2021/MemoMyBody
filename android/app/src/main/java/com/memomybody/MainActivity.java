package com.memomybody;

import android.os.Bundle; //추가 
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // 추가해주세요.

public class MainActivity extends ReactActivity {
  @Override // 추가
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // 추가해주세요.
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "MemoMyBody";
  }
}
