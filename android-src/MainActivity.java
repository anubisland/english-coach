package org.elwazir.englishcoach;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        /* جسرُ النطق: المتصفّحُ الداخليُّ لا يَرى أصواتَ النظام. */
        registerPlugin(TtsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
