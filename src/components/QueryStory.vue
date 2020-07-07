<template>
    <div class="mt-6">
        <v-row
            class="my-4"
            v-for="(url, index) in items"
            :key="'url-' + index"
            justify="center"
        >
            <v-btn
                outlined
                text
                @click="setUrl(url)"
                class="px-12 py-4 title font-weight-light"
            >
                {{ url }}
            </v-btn>
        </v-row>
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex";

    export default {
        methods: {
            ...mapMutations({
                setUrl: 'setUrl'
            })
        },
        computed: {
            ...mapState({
                items: 'list'
            })
        }
    }
</script>