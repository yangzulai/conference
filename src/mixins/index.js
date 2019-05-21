import utils from "../services/utils";

export default {
    data() {
        return {
            isDesktop: utils.platform.is("Desktop")
        }
    },
    methods: {
    }
}