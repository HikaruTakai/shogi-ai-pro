# AI将棋 Pro

どうぶつしょうぎと本将棋を切り替えて遊べる、iPhone優先のPWAです。将棋モードはコミュニティ移植の **YaneuraOu WebAssembly (SIMD) USIエンジン**に接続しています。簡易な着手スコアラーで代用せず、エンジンが利用できない場合もそれを明示し、強さを偽装しません。

## 開発・起動

```sh
npm install
npm run dev
```

`npm run setup:engine` が `yaneuraou.wasm` の配布済みWebAssembly/JS/データを `public/engine/` にコピーします。エンジンが同梱する評価データは同プロジェクトの小型ネットワークです。ネットワークの追加ダウンロードや学習機能はありません。`npm run build` で `dist/` を作ります。

## デプロイ要件

ブラウザーでYaneuraOu WASMを動かすにはHTTPSと、少なくとも次のCross-Origin Isolationヘッダーを返すホスティングが必要です。

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

Vite dev/previewには設定済みです。Netlify向けには `_headers` を含めています。GitHub Pagesでは任意レスポンスヘッダーを構成できないため、この構成のマルチスレッドWASMエンジンの配信先としては推奨しません。Service WorkerだけではHTTPヘッダー要件を置き換えられません。

## AI・WebGPUについて

このYaneuraOu移植版は **WebAssembly SIMDを使うCPUエンジン**であり、WebGPUを使うものではありません。WebGPUでNNUE推論するには、エンジン評価部をGPU向けに移植し、GPU用カーネルと互換モデル・精度検証を用意する必要があります。現在は、WebGPU対応を装ったり、レベル100をスーパーコンピューター相当と称したりしていません。レベル/考慮時間設定は探索の時間配分で、実力は端末性能、ネットワーク、エンジンビルドに依存します。

## 機能と制約

- どうぶつしょうぎと9×9将棋の切り替え、駒操作、持ち駒、待った、手動対局、設定保存
- 本将棋モードはYaneuraOu USIの `position sfen` / `go movetime` / `bestmove` をWorker経由で利用
- フロント側の合法手判定は基本的な盤上移動・成り・打ち駒制約を実装していますが、公式ルール全体の監査済み実装ではありません。打ち歩詰め、千日手/連続王手の千日手、完全な棋譜・対局時計などは未実装です。勝敗確定の重要用途には使わず、ルール検証を継続してください。
- オンライン対局、ランキング、アカウント、ユーザー追跡IDは未実装。バックエンドなしにそれらが動作するような表示や架空データは行いません。

## ライセンス

アプリ独自部分とYaneuraOu移植版ではライセンスが異なります。YaneuraOu.wasmは上流READMEにGPL-3.0と記載されています。配布時には上流のライセンス全文、著作権表示、対応するソースコード提供義務を確認してください。評価データの配布条件も別途確認してください。

エンジン: [arashigaoka/YaneuraOu.wasm](https://github.com/arashigaoka/YaneuraOu.wasm) · [npm](https://www.npmjs.com/package/yaneuraou.wasm)
