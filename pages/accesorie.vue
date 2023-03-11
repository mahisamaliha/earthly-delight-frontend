<template>
    <div>
        <div class="accesorie-section">
            <div class="accesorie-section--img pb-30">
                <figure>
                    <img src="/assets/img/toolFrame.png" alt="" />
                </figure>
            </div>
            <div class="accesorie-section--area ">
                <div class="accesorie-section--area---tools " v-for="accesorie in accesories" :key="accesorie.id">
                    <div>
                        <figure>
                            <img :src="accesorie.image" />
                        </figure>
                    </div>
                    <div>
                        <h3>
                            <h4>{{ accesorie.price }}</h4>
                        </h3>
                    </div>
                </div>
            </div>
            <div class="auction container pt-50 pb-50">
            <div class="auction-section pb-30" v-for="auction in auctions" :key="auction.id">
                <div class="auction-img">
                    <div class="img">
                        <h4>{{ auction.id }}.</h4>
                        <div>
                            <figure class="grid-list--picture---first">
                                <img :src="auction.image" />
                            </figure>
                        </div>
                    </div>
                    <div class="auction-area">
                        <div class="bidding-area bg-gray">
                            <h4>{{ auction.price }}</h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: null,
            auctions: [],
        };
    },
    methods: {
        async callAuction() {
            const res = await this.callApi("get", "/app/auction");
            if (res.status == 200) {
                this.auctions = res.data.data;
                console.log(this.message);
            } else {
                this.message = "Error calling API";
            }
        },
    },
    created() {
        this.callAuction();
    },

};
</script>