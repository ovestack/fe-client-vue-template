<i18n>
    {
        "cn": {
            "title": "我是标题"
        },
        "en": {
            "title": "hello world"
        },
        "ja": {
            "title": "タイトル"
        }
    }
</i18n>

<template>
    <div>
        <select v-model="$i18n.locale">
            <option value="ja">日本语</option>
            <option value="cn">中文</option>
            <option value="en">English</option>
        </select>
        <h1>{{$t('title')}}</h1>
    </div>
</template>

<script>
    export default {

    }
</script>