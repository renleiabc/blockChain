<!--
 * @Author: abc
 * @Date: 2021-08-05 17:24:23
 * @LastEditors: abc
 * @LastEditTime: 2021-08-07 18:39:21
 * @Description: 
-->
<template>
  <el-container>
    <el-header>
      <div id="nav">
        <router-link to="/">私钥</router-link> |
        <router-link to="/address">公钥和地址</router-link>|
        <router-link to="/signature">签名</router-link>|
        <router-link to="/segwit">Segwit地址</router-link>|
        <router-link to="/hd">HD钱包</router-link>|
        <router-link to="/words">助记词</router-link>|
        <router-link to="/balance">余额</router-link>
      </div>
    </el-header>
    <el-main>
      <el-row justify="center">
        <el-col :span="16">
          <h1>bitcoinjs-lib库的版本是5.2.0</h1>
          <router-view />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style lang="scss">
@import './assets/index.scss';
</style>
