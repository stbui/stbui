ǰ�˼��ɽ������
======

* ���о�̬��Դ�Զ��� ``md5�汾��``
* ֧�ָ����о�̬��Դ�������ǰ׺
* JS �ļ��ķ������ϲ���ѹ�����汾����
* CSS �ļ��ķ������ϲ���ѹ�����汾����
* HTML �ļ�������ѹ�����汾����
* ���ģ��ķ������ֿ鹹���������������ϲ���ѹ�����汾����
* ��̬��Դ�ķ�����ѹ�����汾����
* pngͼƬѹ����֧�� ``��png24ѹ��Ϊpng8``
* ���ñ��ؿ������Է�������֧������ ``jsp``��``php``
* ֧��ʹ�� ``less``��``es6`` ������Ŀ
* ֧���ļ����������漴����
* ֧��������Զ�ˢ�£����漴ˢ��
* �����ϴ���Զ�˷����������漴���������ϴ�
* ��������ʹ�� cmd �淶
* ֧�ַֿ���غ��첽����
* ���õĹ�����������֧��

��ϸ�÷�
=========

## ��װ

```bash
npm install -g stbui
```

��װ�ɹ���ִ�� ``stbui -h`` ���ɿ�����ؿ����������


## ���һ��todo������Ŀ

```bash
stbui project demo
```

## �ô�����������

���ȣ��������õĵ��Է�������

```bash
stbui server start
```

```bash
stbui release
```


## Ŀ¼�淶

ҵ��Ŀ¼
page
    index
    login
    user

���Ŀ¼
widget
    tab
    list



## �����ļ�

Ĭ�������ļ�Ϊ stbui-conf.js��stbui ������������̶���ͨ�����������Ƶġ�


## stbui ����

```bash
stbui release
stbui server
```

## stbui �����
```bash
npm run start
npm run bulid
npm run prd
```

## webpack
start
```bash
webpack-dev-server --devtool eval --progress --colors --hot --content-base build
```
dev
```bash
webpack --progress --colors --watch
```

watch
```bash
webpack-dev-server --hot --progress --colors
```
prd
```bash
NODE_ENV=production webpack --progress --colors
```

## fis
start
```bash
stbui server start -p 1111 --www ./dist
```
dev
``bash
stbui release dev -d ./dist
```

watch
```bash
stbui release dev -d ./dist -w -l
```

prd
```bash
stbui release prd -d ./dist
```


���ʹ��������ʲô���ù���ĵط�����ӭ�������ߵ绰10086

�ο�����
https://coolie.ydr.me/introduction/coolie/