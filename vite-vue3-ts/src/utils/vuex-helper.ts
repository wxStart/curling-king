import { createNamespacedHelpers } from 'vuex';
class VuexMixinFactory {
  static createMixin(namespace: string, { states = {}, getters = {}, mutations = {}, actions = {} }) {
    const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers(namespace);

    const mixin = {
      computed: {},
      methods: {},
    };

    let computed = {};

    if (states) {
      computed = mapState(states);
    }

    if (getters) {
      computed = { ...computed, ...mapGetters(getters) };
    }

    mixin.computed = computed;

    let methods = {};

    if (mutations) {
      methods = mapMutations(mutations);
    }

    if (actions) {
      methods = { ...methods, ...mapActions(actions) };
    }

    mixin.methods = methods;
    return mixin;
  }
}

export { VuexMixinFactory };
