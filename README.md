# ionic_pinning

STEP O
$nvm use v10.16.0

STEP 1
$ionic start ionic_pinning --type=ionic-angular

STEP 2 - add http advanced plugin
$ionic cordova plugin add cordova-plugin-advanced-http
$npm install --save @ionic-native/http@4

STEP 3 - add HTTP as a provider on app.module.ts
import { HTTP } from '@ionic-native/http';
...
  providers: [
    HTTP,
    ...

STEP 4 - enable SSLCert on app.component.ts
import { HTTP } from '@ionic-native/http';
...
  constructor(..... , private http: HTTP) {
  ...
    this.http.setSSLCertMode('pinned')
        .then(() => {
        ....

STEP 4 - call howmyssl and badssl for testing
          this.testURL('https://badssl.com/');
          this.testURL('https://www.howsmyssl.com/a/check');

STEP 5 - add howsmyssl.com certificate
openssl s_client -showcerts -connect howsmyssl.com:443 -servername howsmyssl.com:443 </dev/null | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > certificate.pem
openssl x509 -inform PEM -in certificate.pem -outform DER -out howsmyssl.cer

STEP 6 - add client.badssl.com certificate
openssl s_client -showcerts -connect client.badssl.com:443 -servername client.badssl.com:443 </dev/null | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > certificate.pem
openssl x509 -inform PEM -in certificate.pem -outform DER -out badssl.cer

STEP 7 - add both certificates to www/certificates folder
rm certificate.pem

STEP 8 - run
ionic cordova run android

********************************************
following links where really usefull

https://ionicframework.com/docs/v3/native/http/
https://github.com/sijovijayan/SSL-pinning-with-ionic-cordova-example
https://stackoverflow.com/questions/59453376/how-to-implement-ssl-key-pinning-in-ios-in-ionic-3
https://stackoverflow.com/questions/38095559/https-test-server-that-checks-client-certificates
https://developer.android.com/training/articles/security-ssl#java
