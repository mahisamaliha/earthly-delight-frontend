<template>
    <div class="conatiner m-auto col-lg-8 p-5">
        <div v-if="isDataLoading" class="loader-lg">
            <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i>
        </div>
        <div v-else>
            <section class="container">
                <Button @click="showAddModal">Add Auction Product</Button>


                <div class="cart-section pt-50 pb-50">
                    <div class="cart-section--table">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Current Bidding</th>
                                    <th scope="col">Remaining Time</th>
                                    <th scope="col">Highest Bid</th>
                                    <th scope="col">Current Bid</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(auction, index) in auctions" :key="index">
                                    <td>
                                        <img :src="auction.image" alt="Product" />
                                    </td>
                                    <td>{{ auction.price }}</td>
                                    <td>{{ auction.bidding_list }}</td>
                                    <td>{{ auction.current_timer }}</td>
                                    <td>{{ auction.highest_bid }}</td>
                                    <td>{{ auction.current_bid }}</td>
                                    <td>
                                        <i class="lni lni-pencil" @click="showEdit(index)"></i>
                                    </td>
                                    <td>
                                        <i class="lni lni-trash-can" @click="deleteProduct(index)"></i>
                                    </td>
                                </tr>
                                <div v-if="loadMoreLoading && !noPostRemaining"
                                    class="loader-lg d-flex justify-content-center">
                                    <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i>
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Modal v-model="addModal" :closable="true">
                <div>
                    <Form label-position="top">
                        <FormItem label="Price" :error="errorMessages.price" :required="true">
                            <Input type="text" placeholder="Price" v-model="formValue.price"></Input>
                        </FormItem>

                        <FormItem label="Current Bidding" :error="errorMessages.bidding_list" :required="true">
                            <Input type="number" style="width: 100%" placeholder="Current Bidding"
                                v-model="formValue.bidding_list"></Input>
                        </FormItem>

                        <FormItem label="Remaining Time" :error="errorMessages.current_timer" :required="true">
                            <Input type="number" style="width: 100%" placeholder="Remaining Time"
                                v-model="formValue.current_timer"></Input>
                        </FormItem>

                        <FormItem label="Description" :error="errorMessages.description" :required="true">
                            <Input v-model="formValue.description" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
                                placeholder="Write description..."></Input>
                        </FormItem>

                        <FormItem label="Highest Bid" :error="errorMessages.highest_bid" :required="true">
                            <Input type="number" style="width: 100%" placeholder="Highest Bid"
                                v-model="formValue.highest_bid"></Input>
                        </FormItem>

                        <FormItem 
                            label="Current Bid" 
                            :error="errorMessages.current_bid" 
                            :required="true">
                            <Input type="number" style="width: 100%" placeholder="Current Bid"
                                v-model="formValue.current_bid"></Input>
                        </FormItem>

                        <FormItem 
                            label="thumbnail Display image" 
                            :error="errorMessages.image" 
                            :required="true">
                            <div>
                                <Upload ref="uploads" type="drag" :multiple="false" :show-upload-list="true"
                                    :on-success="handleImageSuccess" :format="['jpg', 'jpeg', 'png']"
                                    :on-format-error="handleFormatError" :on-error="handleError"
                                    :on-exceeded-size="handleMaxSize" :on-remove="handleRemove" :max-size="2048"
                                    action="http://127.0.0.1:8000/app/auction_upload">
                                    <div style="padding: 5px 0">
                                        <Icon type="ios-cloud-upload" size="22" style="color: #3399ff"></Icon>
                                        Upload Image
                                    </div>
                                </Upload>
                                <img :src="imageName" />
                            </div>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button type="primary" :loading="loading" @click="productAdd" style="margin-right: 10px">
                        <span v-if="!loading">Add</span>
                        <span v-else>Please wait...</span>
                    </Button>
                    <Button @click="hideAddModal">Cancel</Button>
                </div>
            </Modal>
            <Modal v-model="editModal" :closable="true">
                <div>
                    <Form label-position="top">
                        <FormItem label="Price" :error="editErrorMessages.price" :required="true">
                            <Input type="text" placeholder="Price" v-model="editValue.price"></Input>
                        </FormItem>

                        <FormItem label="Current Bidding" :error="editErrorMessages.bidding_list" :required="true">
                            <Input type="number" style="width: 100%" placeholder="Current Bidding"
                                v-model="editValue.bidding_list"></Input>
                        </FormItem>

                        <FormItem label="Remaining Time" :error="editErrorMessages.current_timer" :required="true">
                            <Input type="number" style="width: 100%" placeholder="Remaining Time"
                                v-model="editValue.current_timer"></Input>
                        </FormItem>

                        <FormItem label="Description" :error="editErrorMessages.description" :required="true">
                            <Input v-model="editValue.description" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"
                                placeholder="Write description..."></Input>
                        </FormItem>

                        <FormItem label="Highest Bid" :error="editErrorMessages.highest_bid" :required="true">
                            <Input type="number" style="width: 100%" placeholder="Highest Bid"
                                v-model="editValue.highest_bid"></Input>
                        </FormItem>

                        <FormItem label="Current Bid" :error="editErrorMessages.current_bid" :required="true">
                            <Input type="number" style="width: 100%" placeholder="Current Bid"
                                v-model="editValue.current_bid"></Input>
                        </FormItem>

                        <FormItem 
                            label="thumbnail Display image" 
                            :error="editErrorMessages.image" 
                            :required="true">
                            <div>
                                <Upload ref="uploads" type="drag" 
                                    :multiple="false" :show-upload-list="true"
                                    :on-success="handleImageSuccess" 
                                    :format="['jpg', 'jpeg', 'png']"
                                    :on-format-error="handleFormatError" 
                                    :on-error="handleError"
                                    :on-exceeded-size="handleMaxSize" 
                                    :on-remove="handleRemove" 
                                    :max-size="2048"
                                    action="http://127.0.0.1:8000/app/auction_upload">
                                    <div style="padding: 5px 0">
                                        <Icon type="ios-cloud-upload" size="22" style="color: #3399ff"></Icon>
                                        Upload Image
                                    </div>
                                </Upload>
                            </div>
                            <img :src="imageName" />
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button type="primary" :loading="loading" @click="productUpdate" style="margin-right: 10px">
                        <span v-if="!loading">Update</span>
                        <span v-else>Please wait...</span>
                    </Button>
                    <Button @click="hideAddModal">Cancel</Button>
                </div>
            </Modal>
            <Modal title="View Image" v-model="visible">
                <img :src="modalImageUrl" v-if="visible" style="width: 100%" />
            </Modal>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            loading: false,
            isDataLoading: false,
            visible: false,
            addModal: false,
            editModal: false,
            loadMoreLoading: false,
            noProductRemaining: false,
            noPostRemaining: false,

            modalImageUrl: "",
            formValue: {
                image: "",
                price: "",
                bidding_list: "",
                current_timer: "",
                description: {},
                highest_bid: "",
                current_bid: "",
            },
            editValue: {
                image: "",
                price: "",
                bidding_list: "",
                current_timer: "",
                description: {},
                highest_bid: "",
                current_bid: "",
            },
            errorMessages: {
                image: "",
                price: "",
                bidding_list: "",
                current_timer: "",
                description: "",
                highest_bid: "",
                current_bid: "",
            },
            editErrorMessages: {
                image: "",
                price: "",
                bidding_list: "",
                current_timer: "",
                description: "",
                highest_bid: "",
                current_bid: "",
            },
            index: -1,
            limit: 5,
            auctions: [],
            isEditingItem: false,
            imageName: "",
        };
    },
    methods: {
        showAddModal() {
            this.imageName = "";
            this.addModal = true;
            this.clearErrorMessage();
        },
        hideAddModal() {
            this.imageName = "";
            this.addModal = false;
            this.editModal = false;
            this.clearErrorMessage();
        },
        // up or edit image by user
        handleImageSuccess(res, file) {
            res = `http://localhost:8000/images/${res}`;
            this.imageName = res;

            if (this.isEditingItem) {
                console.log("inside");
                return (this.editValue.image = res);
            } else {
                this.formValue.image = res;
            }
        },

        async handleRemove(file, fileList) {
            let image = this.formValue.image;
            this.$refs.editDataUploads.clearFiles(); //clear upload image
            const res = await this.callApi("post", "/app/delete_auction_image", {
                imageName: image,
            });
            if (res.status != 200) {
                this.formValue.image = image;
                this.swr();
            }
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: "The file format is incorrect",
                desc:
                    "File format of " +
                    file.name +
                    " is incorrect, please select jpg or png.",
            });
        },
        handleError(res, file) {
            this.$Notice.warning({
                title: "The file format is incorrect",
                desc: `${file.errors.file.length //descrip of error
                    ? file.errors.file[0]
                    : "Something went wrong!"
                    }`,
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: "Exceeding file size limit",
                desc: "File  " + file.name + " is too large, no more than 2M.",
            });
        },
        handleView(item, index) {
            this.modalImageUrl = item;
            this.visible = true;
        },

        clearErrorMessage() {
            this.errorMessages = {
                price: "",
                image: "",
                bidding_list: "",
                current_timer: "",
                description: "",
                highest_bid: "",
                current_bid: "",
            };
            this.editErrorMessages = {
                price: "",
                image: "",
                bidding_list: "",
                current_timer: "",
                description: "",
                highest_bid: "",
                current_bid: "",
            };
        },
        showEdit(index) {
            this.clearErrorMessage();
            if (this.auctions[index].id) {
                this.isEditingItem = true;
                this.index = index;
                this.editValue.id = this.auctions[index].id;
                this.editValue.price = this.auctions[index].price;
                this.editValue.bidding_list = this.auctions[index].bidding_list;
                this.editValue.current_timer = this.auctions[index].current_timer;
                this.editValue.description = this.auctions[index].description;
                this.editValue.highest_bid = this.auctions[index].highest_bid;
                this.editValue.current_bid = this.auctions[index].current_bid;
                this.editValue.image = this.auctions[index].image;
                this.imageName = this.auctions[index].image;
                
                this.editModal = true;
            }
        },
        async productUpdate() {
            let validation = true;
            this.clearErrorMessage();
            if (
                this.editValue.price == "" ||
                this.editValue.price.trim() == ""
            ) {
                validation = false;
                this.editErrorMessages.price = "Product price is required!";
            }

            if (this.editValue.bidding_list == "") {
                validation = false;
                this.editErrorMessages.bidding_list = "Bidding Number is required!";
            }

            if (this.editValue.current_timer == "") {
                validation = false;
                this.editErrorMessages.current_timer = "Remaining Time is required!";
            }

            if (this.editValue.description == "") {
                validation = false;
                this.editErrorMessages.description = "Description is required!";
            }

            if (this.editValue.highest_bid == "") {
                validation = false;
                this.editErrorMessages.highest_bid = "Highest Bid is required!";
            }

            if (this.editValue.current_bid == "") {
                validation = false;
                this.editErrorMessages.current_bid = "Current Bid is required!";
            }

            if (validation == false) return this.$Message.error("Validation Failed!");
            this.editValue.description =
                this.editValue.description;
            this.sending = true;
            const res = await this.callApi(
                "post",
                "/app/auction_product_update",
                this.editValue
            );

            if (res.status === 201) {
                this.getProduct();
                this.s("Product Updated!!");
                this.editModal = false;
            } else {
                if (res.status == 422) {
                    for (let i in res.data.errors) {
                        this.errors = res.data.errors;
                    }
                } else {
                    this.swr();
                }
            }
            this.sending = false;
            this.errors = [];
        },

        async productAdd() {
            let validation = true;
            this.clearErrorMessage();
            if (
                this.formValue.price == "" ||
                this.formValue.price.trim() == ""
            ) {
                validation = false;
                this.errorMessages.price = "Product price is required!";
            }

            if (this.formValue.bidding_list == "") {
                validation = false;
                this.errorMessages.bidding_list = "Bidding number is required!";
            }

            if (this.formValue.current_timer == "") {
                validation = false;
                this.errorMessages.current_timer = "Remaining Time is required!";
            }

            if (this.formValue.description == "") {
                validation = false;
                this.errorMessages.description = "Description is required!";
            }

            if (this.formValue.highest_bid == "") {
                validation = false;
                this.errorMessages.highest_bid = "Highest Bid is required!";
            }

            if (this.formValue.current_bid == "") {
                validation = false;
                this.errorMessages.current_bid = "Current Bid is required!";
            }

            if (validation == false) return this.$Message.error("Validation Failed!");
            this.formValue.description =
                this.formValue.description;
            this.loading = true;
            const res = await this.callApi(
                "post",
                "/app/auction_product",
                this.formValue
            );
            if (res.status == 201) {
                this.s("Great!", "Product has been added successfully!");
                this.imageUrl = "";
                this.getProduct();
                this.hideAddModal();
            } else {
                this.swr();
            }
            this.loading = false;
        },
        async getProduct() {
            this.isDataLoading = true;
            const response = await this.callApi(
                "get",
                `/app/auction_product?limit=${this.limit}`
            );
            if (response.status == 200) {
                this.auctions = response.data.data;
            } else this.e("Oops!", "Something went wrong, please try again!");
            this.isDataLoading = false;
        },
        async loadMore(more = 20) {
            console.log("Load more is calling! length", this.auctions.length);

            if (this.noProductRemaining) return;

            this.limit = this.limit + more;
            this.loadMoreLoading = true;
            const res = await this.callApi(
                "get",
                `/app/auction_product?limit=${this.limit}`
            );
            if (res.status == 200) {
                let prevLength = this.auctions.length;
                if (this.auctions.length == res.data.data.length) {
                    this.noProductRemaining = true;
                }
                for (let i in res.data.data) {
                    console.log("pushing data");
                    let d = res.data.data[i];
                    if (i >= prevLength) {
                        this.auctions.push(d);
                    }
                }
            }
            this.loadMoreLoading = false;
            console.log("Load more is finished! length", this.auctions.length);
        },
        async deleteProduct(index) {
            let id = this.auctions[index].id;
            const res = await this.callApi("post", `/app/auction_product/${id}`);
            if (res.status == 201) {
                this.auctions.splice(index, 1);
                this.s("Deleted");
            } else this.swr();
        },
    },

    async created() {
        this.getProduct();
    },

    //helps to get more data in the component
    mounted() {
        window.onscroll = () => {
            this.bottomOfWindow =
                window.pageYOffset + window.innerHeight >
                document.body.scrollHeight - 100;

            if (this.bottomOfWindow) {
                if (!this.loadMoreLoading) {
                    this.loadMore(20);
                }
            }
        };
    },
};
</script>