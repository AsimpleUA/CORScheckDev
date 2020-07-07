<template>
    <v-form v-model="valid" ref="form">
        <v-row class="mt-12 pt-12 px-4" justify="center">
            <v-col
                cols="12"
                xs="12"
                sm="11"
                md="9"
                lg="7"
            >
                <v-text-field
                    label="URL"
                    v-model="modelUrl"
                    hint="enter full url"
                    :rules="[ rules.required, rules.link ]"
                    @keydown.enter.prevent="checkUrl"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="my-4 px-4" justify="center">
            <v-btn tile dark @click="checkUrl">Check URL CORS</v-btn>
        </v-row>
        <v-row class="mt-4 px-4" justify="center">
            <v-btn text  :color="color" class="font-weight-light headline" readonly>{{ message}}</v-btn>
        </v-row>
    </v-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import validation from "@/stats/validation.js";

export default {
    data: () => ({
        valid: true,
        rules: validation,
        message: '',
        color: "success"
    }),
    computed: {
        modelUrl: {
            get() {
                return this.url;
            },
            set(val){
                this.setUrl(val);
            }
        },
        ...mapState({
            url: 'url'
        })
    },
    methods: {
        checkUrl() {
            if(this.$refs.form.validate()) {
                this.test(this.url).then(m => {
                    this.message = m.message;
                    this.color = m.success ? 'success' : 'error';
                });
            }
        },
        ...mapActions({
            test: 'test'
        }),
        ...mapMutations({
            setUrl: 'setUrl'
        })
    }
}
</script>