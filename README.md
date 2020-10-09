showbox

## システム概要
靴箱に靴をおくとleafonyの角度が変わるような仕組みをを設置することで出席を確認するシステムです。  
leafonyは加速度を取得し角度の算出を行います。  
角度が変化したら、bluetoothでラズパイに送信します。  
受信したデータはgoogle spreadsheetに追加します。  
vueで静的ファイルを作成し出席状況をスマホなどのデバイスに表示します。
デモページは[こちら](https://rtakaha.github.io/showbox_pages/)。APIに直接アクセスしないバージョンになっています。

## 使い方
- ```gas```ディレクトリ内のファイルを使ってAPIを作成する

```GAS API```などで検索してみてください。

- コンテナのイメージをビルドする(イメージがない場合)

```$ docker build -t vue_app_image .```

- ビルドしたイメージからコンテナを起動する

```$ docker run -v `pwd`:/usr/src/app -p 9050:9050 --name showbox -it -d vue_app_image```

- コンテナに入る

```$ docker exec -it showbox sh```

- nodeモジュールをインストールする

```$ npm install```

- ローカルサーバを立てる

```$ npm run serve```
