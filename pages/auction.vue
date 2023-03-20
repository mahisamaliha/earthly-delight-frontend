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
                            <h4 class="bidding-area--price">{{ auction.price }} ৳</h4>
                            <h4 class="bidding-area--number">Current Bid ({{ auction.bidding_list }} bids)</h4>
                            <h4 class="bidding-area--hours"><i class="lar la-clock"></i> {{ auction.current_timer }} hrs
                                remaining</h4>
                            <hr>
                            <h4 class="bidding-area--highest">Highest Bidding Is : ৳ {{ auction.highest_bid }}</h4>
                            <div class="bid">
                                <button @click="placeBid(auction.id)">Bid</button>
                                <div class="icon">
                                    <button @click="decrement"><i class="las la-minus"></i></button>
                                    <p>৳ {{value}}</p>
                                    <button @click="increment"><i class="las la-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="bidding-details">
                            <ul>
                                <li>
                                    <p>{{ auction.description }}</p>
                                </li>
                            </ul>
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
            user: [],
            value : 673,
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
        async placeBid(auctionId) {
            const res2 = await this.callApi("get", "/app/get-user-id");
            if (res2.status == 200) {                
                const data = {
                    user_id: res2.data['user_id'],
                    auction_id: auctionId,
                    bidding_price: this.value
                };
                try {
                    const response = await this.callApi('post', '/app/auction-tracking', data);
                    if (response.status == 200) {                        
                        console.log("Successfully Added");
                    } else {
                        const response = await this.callApi('put', `/app/auction-tracking/${res2.data['user_id']}/${auctionId}`, data);
                        if (response.status == 200) {                        
                            console.log("Successfully Updated",this.value);
                        } else {
                            console.log("Error to create or update bid info!");
                        }
                    }
                } catch (error) {
                    console.error(error,data);
                }
            } else {
                this.message = "Error calling API";
            }
        },
        increment() {
            this.value++
        },
        decrement() {
            if (this.value > 673) {
                this.value--
            }
        }
    },
    created() {
        this.callAuction();
    },
};
</script>