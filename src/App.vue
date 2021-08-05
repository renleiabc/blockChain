<!--
 * @Author: abc
 * @Date: 2021-08-05 17:24:23
 * @LastEditors: abc
 * @LastEditTime: 2021-08-05 18:01:12
 * @Description: 
-->
<template>
  <el-container>
    <el-header>
      <div id="nav">
        <router-link to="/">私钥</router-link> |
        <router-link to="/address">公钥和地址</router-link>
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
