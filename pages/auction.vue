<template>
    <div>
        <!--************Navbar****************-->

        <!-- <Navbar /> -->
        <div class="header-info">
            <div class="container">
                <div class="header-info-content">
                    <div class="header-info-content-item d-none d-lg-block">
                        Refer a Friend. Get 20% Off
                    </div>
                    <div class="header-info-content-item d-none d-lg-block">
                        Subscribe Today Get $10 Off
                    </div>
                    <div class="header-info-content-item d-none d-lg-block">
                        Free Shipping +30 Day Returns
                    </div>
                </div>
            </div>
        </div>

        <div class="auction container pt-50 pb-50">
            <div class="auction-section pb-30" v-for="auction in auctions" :key="auction.id">
                <div class="auction-img">
                    <!-- <img :src="auction.image" /> -->

                    <div class="img">
                        <h4>{{ auction.id }}.</h4>
                        <div>
                            <figure class="grid-list--picture---first">
                                <!-- <img src="/assets/img/about1.png" alt="" /> -->
                                <img :src="auction.image" />

                            </figure>
                        </div>
                    </div>
                    <div class="auction-area">
                        <div class="bidding-area bg-gray">
                            <h4>{{ auction.price }}</h4>
                            <h4 class="bidding-area--number">Current Bid ({{ auction.bidding_list }} bids)</h4>
                            <h4 class="bidding-area--hours"><i class="lar la-clock"></i> {{ auction.current_timer }} hrs
                                remaining</h4>
                            <hr>
                            <h4 class="bidding-area--highest">Highest Bidding Is : ৳ {{ auction.highest_bid }}</h4>
                            <div class="bid">
                                <button @click="callAuction">Bid</button>
                                <div class="icon">
                                    <button @click="decrement"><i class="las la-minus"></i></button>
                                    <!-- <p>৳ {{ auction.current_bid }} {{value}}</p> -->
                                    <p>৳ {{value}}</p>
                                    <button @click="increment"><i class="las la-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="bidding-details">
                            <ul>
                                <li>
                                    <!-- BEAUTIFUL BONSAI TREE: Very Unique Bonsai Material, with leaves and branches that weep.
                                Fast growing, a unique specimen indeed. -->
                                    <p>{{ auction.description }}</p>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- <div v-for="auction in auctions" :key="auction.id">
            <img :src="auction.image" />
            <p>{{ auction.description }}</p>
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: null,
            auctions: [],
            value : 601,
        };
    },
    methods: {
        async callAuction() {
            const res = await this.callApi("get", "/app/auction");
            if (res.status == 200) {
                this.auctions = res.data.data;

                // this.message = res.data;
                console.log(this.message);
            } else {
                this.message = "Error calling API";
            }
        },
        increment() {
            this.value++
        },
        decrement() {
            if (this.value > 601) {
                this.value--
            }
        }
    },
    created() {
        this.callAuction();
    },

};
</script>