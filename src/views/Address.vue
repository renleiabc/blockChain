<!--
 * @Author: abc
 * @Date: 2021-07-28 17:31:16
 * @LastEditors: abc
 * @LastEditTime: 2021-08-05 17:38:26
 * @Description: 公钥和地址

-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="about-box">
      <div class="target">
        <p>
          <span>Address 以3开头：</span>
          <span>{{ btc }}</span>
        </p>
        <p>
          <span>Address 以bc开头：</span>
          <span>{{ bc }}</span>
        </p>
      </div>
      <p>
        <span>Private key：</span>
        <span>{{ privateKey }}</span>
      </p>
      <p>
        <span>Public key：</span>
        <span>{{ publicKey }}</span>
      </p>
      <p>
        <span>Address：</span>
        <span>{{ address }}</span>
      </p>

      <p>
        <span>PrivateKey WIF：</span>
        <span>{{ privateKeyWIF }}</span>
      </p>
      <p>
        <span>Address 以bc开头：</span>
        <span>{{ bc }}</span>
      </p>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
const secureRandom = require('secure-random');
const elliptic = require('elliptic');
const sha256 = require('js-sha256');
const ripemd160 = require('ripemd160');
const bs58 = require('bs58');
const { bech32 } = require('bech32');
export default {
  data() {
    return {
      privateKey: '',
      publicKey: '',
      address: '',
      AddressBc: '',
      privateKeyWIF: '',
      btc: '3KZ1aA2ZMVZZfWRnFQgB5XdiQRzstAaNHG',
      bc: 'bc1q0ezhvyu8dpsvgk25r2v7vp7sdt5v8j5xnd74jq'
    };
  },
  mounted() {
    // let privateKey = secureRandom.randomBuffer(32);
    let privateKey =
      '55bde7b83e62271fa978b572b4c7a1bddb7b449ddb2b8cbf023224e811bdf284';
    this.privateKey = privateKey.toString('hex');
    console.log('> Private key created: ', privateKey.toString('hex'));
    const max = Buffer.from(
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140',
      'hex'
    );
    console.log(max);
    const ec = elliptic.ec;
    const ecdsa = new ec('secp256k1');
    const keys = ecdsa.keyFromPrivate(privateKey);
    const publicKey = keys.getPublic('hex');
    console.log('> Public key created: ', publicKey);
    this.publicKey = publicKey;
    this.createPrivateKeyWIF(privateKey);
    let publicHash = sha256(Buffer.from(publicKey, 'hex'));
    let publicKeyHash = new ripemd160()
      .update(Buffer.from(publicHash, 'hex'))
      .digest();
    console.log(publicKeyHash);
    const address = this.createPublicAddress(publicKeyHash);
    this.address = address;
    console.log(address);
    let privateHash = sha256(Buffer.from(privateKey, 'hex'));
    let privateKeyHash = new ripemd160()
      .update(Buffer.from(privateHash, 'hex'))
      .digest();
    const privateKeyWIF = this.createPrivateKeyWIF(privateKeyHash);
    this.privateKeyWIF = privateKeyWIF;
    this.AddressBc = this.createAddressBech32(privateKeyHash);
    /*  let isInvalid = true;
    let privateKey1;
    while (isInvalid) {
      privateKey1 = secureRandom.randomBuffer(32);
      if (Buffer.compare(max, privateKey) === 1) {
        isInvalid = false;
      }
    }
    console.log('> Private key: ', privateKey1.toString('hex')); */
  },
  methods: {
    createPublicAddress(publicKeyHash) {
      console.log(publicKeyHash);
      // step 1 - add prefix “00” in hex
      const step1 = Buffer.from('00' + publicKeyHash.toString('hex'), 'hex');
      console.log(step1);
      // step 2 - create SHA256 hash of step 1
      const step2 = sha256(step1);
      // step 3 - create SHA256 hash of step 2
      const step3 = sha256(Buffer.from(step2, 'hex'));
      // step 4 - find the 1st byte of step 3 - save as “checksum”
      const checksum = step3.substring(0, 8);
      // step 5 - add step 1 + checksum
      const step4 = step1.toString('hex') + checksum;
      console.log(step4);
      // return base 58 encoding of step 5
      const address = bs58.encode(Buffer.from(step4, 'hex'));
      return address;
    },
    createAddressBech32(hash160) {
      // 计算bech32编码:
      let words = bech32.toWords(hash160);
      // 头部添加版本号0x00:
      words.unshift(0);
      // 对地址编码:
      let address = bech32.encode('bc', words);
      console.log(address); // bc1qmy63mjadtw8nhzl69ukdepwzsyvv4yex5qlmkd
      return address;
    },
    createPrivateKeyWIF(privateKeyHash) {
      const step1 = Buffer.from('80' + privateKeyHash.toString('hex'), 'hex');
      const step2 = sha256(step1);
      const step3 = sha256(Buffer.from(step2, 'hex'));
      const checksum = step3.substring(0, 8);
      const step4 = step1.toString('hex') + checksum;
      const privateKeyWIF = bs58.encode(Buffer.from(step4, 'hex'));
      return privateKeyWIF;
    },
    fn() {
      const wif = require('wif');
      // 十六进制表示的私钥:
      let privateKey =
        '0c28fca386c7a227600b2fe50b7cae11ec86d3bf1fbe471be89827e19d72aa1d'; // 对私钥编码:// 0x80前缀
      let encoded = wif.encode(0x80, Buffer.from(privateKey, 'hex'), true);
      console.log(encoded);
    }
  }
};
</script>
<style lang="scss">
.about {
  &-box {
    width: 70%;
    margin: 0 auto;
    text-align: left;
    span {
      display: inline-block;
      &:first-child {
        width: 150px;
        text-align: right;
      }
    }
    .target {
      color: blue;
    }
  }
}
</style>
