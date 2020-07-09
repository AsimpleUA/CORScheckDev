<template>
    <v-form v-model="valid" ref="form">
        <v-row class="mt-12 pt-12 px-4" justify="center">
            <v-col
                cols="4"
                xs="4"
                sm="3"
                md="2"
                lg="1"
            >
                <v-select
                    label="Method"
                    v-model="modelMethod"
                    outlined
                    hint="choose request methods"
                    :rules="[ rules.required ]"
                    :items="methods"
                ></v-select>
            </v-col>
            <v-col
                cols="8"
                xs="8"
                sm="8"
                md="7"
                lg="6"
            >
                <v-text-field
                    label="URL"
                    v-model="modelUrl"
                    outlined
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
import methods from "@/stats/methods.js";

export default {
    data: () => ({
        valid: true,
        rules: validation,
        message: '',
        methods: methods,
        color: "success"
    }),
    computed: {
        modelUrl: {
            get() {
                return this.url;
            },
            set(val){
                this.setUrl({
                    url: val,
                    method: this.method
                });
            }
        },
        modelMethod: {
            get() {
                return this.method;
            },
            set(val){
                this.setUrl({
                    url: this.url,
                    method: val
                });
            }
        },
        ...mapState({
            url: 'url',
            method: 'method'
        })
    },
    methods: {
        checkUrl() {
            if(this.$refs.form.validate()) {
                const form = {
                    method: this.method,
                    url: this.url
                };
                this.test(form).then(m => {
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