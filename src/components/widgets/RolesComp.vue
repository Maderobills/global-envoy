<template>
    <main class="w-4/5 flex flex-col space-y-20 justify-self-center">
        <CardWide/>
        <CardChoose/>
    </main>
</template>
<script>
import CardChoose from './singles/CardChoose.vue';
import CardWide from './singles/CardWide.vue';

    export default {
        components: {
            CardWide,
            CardChoose,
        }
    }
</script>