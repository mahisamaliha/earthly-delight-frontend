<template>
  <div class="conatiner m-auto col-lg-8 p-5">
    <div v-if="isDataLoading" class="loader-lg">
      <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i>
    </div>
    <div v-else>
      <section class="container">
        <Button @click="showAddModal">Add New Product</Button>

        <div class="cart-section pt-50 pb-50">
          <div class="cart-section--table">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>

                  <th scope="col">Subcategory</th>

                  <th scope="col">Selling Price</th>
                  <!-- <th scope="col">Description</th> -->

                  <th scope="col">Update</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>

              <tbody>
                <tr></tr>
                <tr v-for="(product, index) in products" :key="index">
                  <td>
                    <img :src="product.productImage" alt="Product" />
                  </td>
                  <td>{{ product.productName }}</td>
                  <td>{{ product.group.groupName }}</td>

                  <td>{{ product.category.catName }}</td>
                  <td>{{ product.sellingPrice }}</td>
                  <!-- <td >{{ product.brief_description }}</td> -->

                  <td>
                    <i class="lni lni-pencil" @click="showEdit(index)"></i>
                  </td>
                  <td>
                    <i
                      class="lni lni-trash-can"
                      @click="deleteProduct(index)"
                    ></i>
                  </td>
                </tr>
                <div
                  v-if="loadMoreLoading && !noPostRemaining"
                  class="loader-lg d-flex justify-content-center"
                >
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
            <FormItem
              label="Product Name"
              :error="errorMessages.productName"
              :required="true"
            >
              <Input
                type="text"
                placeholder="Product Name"
                v-model="formValue.productName"
              ></Input>
            </FormItem>

            <div class="row">
              <div class="col-6">
                <FormItem
                  label="Category"
                  :error="errorMessages.groupId"
                  :required="true"
                >
                  <div class="input-with-add-button">
                    <Select
                      v-model="formValue.groupId"
                      placeholder="Select Category"
                      @on-change="getSubcategory"
                      filterable
                    >
                      <Option
                        v-for="(group, i) in dataCategory"
                        :value="group.id"
                        :key="i"
                        >{{ group.groupName }}</Option
                      >
                    </Select>
                    <Button
                      type="primary"
                      style="padding: 0px 7px"
                      @click="categoryModal = true"
                      >Add</Button
                    >
                  </div>
                </FormItem>
              </div>

              <div class="col-6">
                <FormItem
                  label="Subcategory"
                  :error="errorMessages.categoryId"
                  :required="true"
                >
                  <div class="input-with-add-button">
                    <Select
                      v-model="formValue.categoryId"
                      :disabled="formValue.groupId == '' ? true : false"
                      placeholder="Select Subactegory"
                      filterable
                    >
                      <Option
                        v-for="(category, i) in dataSubcategory"
                        :value="category.id"
                        :key="i"
                        >{{ category.catName }}</Option
                      >
                    </Select>
                    <Button
                      type="primary"
                      style="padding: 0px 7px"
                      :disabled="formValue.groupId == '' ? true : false"
                      @click="subcategoryModal = true"
                      >Add</Button
                    >
                  </div>
                </FormItem>
              </div>
            </div>
            <FormItem
              label="Starting Price"
              :error="errorMessages.sellingPrice"
              :required="true"
            >
              <Input
                type="number"
                style="width: 100%"
                placeholder="Selling Price"
                v-model="formValue.sellingPrice"
              ></Input>
            </FormItem>

            <FormItem
              label="Description"
              :error="errorMessages.brief_description"
              :required="true"
            >
              <Input
                v-model="formValue.brief_description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write description..."
              ></Input>
              <!-- <span class="text-danger" v-if="errorMessages.brief_description">{{
                  errorMessages.brief_description[0]
                }}</span> -->
            </FormItem>

            <FormItem
              label="thumbnail Display image"
              :error="errorMessages.productImage"
              :required="true"
            >
              <div>
                <Upload
                  ref="uploads"
                  type="drag"
                  :multiple="false"
                  :show-upload-list="true"
                  :on-success="handleImageSuccess"
                  :format="['jpg', 'jpeg', 'png']"
                  :on-format-error="handleFormatError"
                  :on-error="handleError"
                  :on-exceeded-size="handleMaxSize"
                  :on-remove="handleRemove"
                  :max-size="2048"
                  action="http://127.0.0.1:8000/app/upload"
                >
                  <div style="padding: 5px 0">
                    <Icon
                      type="ios-cloud-upload"
                      size="22"
                      style="color: #3399ff"
                    ></Icon>
                    Upload Image
                  </div>
                </Upload>
                <img :src="imageName" />
              </div>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button
            type="primary"
            :loading="loading"
            @click="productAdd"
            style="margin-right: 10px"
          >
            <span v-if="!loading">Add</span>
            <span v-else>Please wait...</span>
          </Button>
          <Button @click="hideAddModal">Cancel</Button>
        </div>
      </Modal>
      <Modal v-model="editModal" :closable="true">
        <div>
          <Form label-position="top">
            <FormItem
              label="Product Name"
              :error="editErrorMessages.productName"
              :required="true"
            >
              <Input
                type="text"
                placeholder="Product Name"
                v-model="editValue.productName"
              ></Input>
            </FormItem>

            <div class="row">
              <div class="col-6">
                <FormItem
                  label="Category"
                  :error="editErrorMessages.groupId"
                  :required="true"
                >
                  <div class="input-with-add-button">
                    <Select
                      v-model="editValue.groupId"
                      placeholder="Select Category"
                      @on-change="getEditSubcategory"
                      filterable
                    >
                      <Option
                        v-for="(group, i) in dataCategory"
                        :value="group.id"
                        :key="i"
                        >{{ group.groupName }}</Option
                      >
                    </Select>
                    <Button
                      type="primary"
                      style="padding: 0px 7px"
                      @click="categoryModal = true"
                      >Add</Button
                    >
                  </div>
                </FormItem>
              </div>

              <div class="col-6">
                <FormItem
                  label="Subcategory"
                  :error="editErrorMessages.categoryId"
                  :required="true"
                >
                  <div class="input-with-add-button">
                    <Select
                      v-model="editValue.categoryId"
                      :disabled="editValue.groupId == '' ? true : false"
                      placeholder="Select Subactegory"
                      filterable
                    >
                      <Option
                        v-for="(category, i) in dataEditSubcategory"
                        :value="category.id"
                        :key="i"
                        >{{ category.catName }}</Option
                      >
                    </Select>
                    <Button
                      type="primary"
                      style="padding: 0px 7px"
                      :disabled="editValue.groupId == '' ? true : false"
                      @click="subcategoryModal = true"
                      >Add</Button
                    >
                  </div>
                </FormItem>
              </div>
            </div>
            <FormItem
              label="Starting Price"
              :error="editErrorMessages.sellingPrice"
              :required="true"
            >
              <Input
                type="number"
                style="width: 100%"
                placeholder="Selling Price"
                v-model="editValue.sellingPrice"
              ></Input>
            </FormItem>

            <FormItem
              label="Description"
              :error="editErrorMessages.brief_description"
              :required="true"
            >
              <Input
                v-model="editValue.brief_description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Write description..."
              ></Input>
            </FormItem>

            <FormItem
              label="thumbnail Display image"
              :error="editErrorMessages.productImage"
              :required="true"
            >
              <div>
                <Upload
                  ref="uploads"
                  type="drag"
                  :multiple="false"
                  :show-upload-list="true"
                  :on-success="handleImageSuccess"
                  :format="['jpg', 'jpeg', 'png']"
                  :on-format-error="handleFormatError"
                  :on-error="handleError"
                  :on-exceeded-size="handleMaxSize"
                  :on-remove="handleRemove"
                  :max-size="2048"
                  action="http://127.0.0.1:8000/app/upload"
                >
                  <div style="padding: 5px 0">
                    <Icon
                      type="ios-cloud-upload"
                      size="22"
                      style="color: #3399ff"
                    ></Icon>
                    Upload Image
                  </div>
                </Upload>
              </div>
              <img :src="imageName" />
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button
            type="primary"
            :loading="loading"
            @click="productUpdate"
            style="margin-right: 10px"
          >
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
      categoryModal: false,
      categoryValue: {
        id: "",
        groupName: "",
        menuId: "",
      },
      categoryErrorMessages: {
        id: "",
        groupName: "",
        menuId: "",
      },
      subcategoryModal: false,
      subcategoryValue: {
        // id: '',
        catName: "",
        group_id: "",
      },
      subcategoryErrorMessages: {
        // id: '',
        catName: "",
        group_id: "",
      },

      modalImageUrl: "",
      formValue: {
        productName: "",
        groupId: "",
        categoryId: "",
        brandId: 2,
        menuId: 1,
        unit: "Pcs",
        tags: [],
        model: "Tree",
        sellingPrice: 0,
        discount: 0,
        productImage: "",
        adminDiscount: 0,
        appDiscount: 0,
        openingQuantity: 0,
        openingUnitPrice: 0,
        brief_description: "",
        description: {},
        stock: 100,
        averageBuyingPrice: 0,
      },
      editValue: {
        productName: "",
        groupId: "",
        categoryId: "",
        brandId: 2,
        menuId: 1,
        unit: "Pcs",
        tags: [],
        model: "Tree",
        sellingPrice: 0,
        discount: 0,
        productImage: "",
        adminDiscount: 0,
        appDiscount: 0,
        openingQuantity: 0,
        openingUnitPrice: 0,
        brief_description: "",
        description: {},
        stock: 100,
        averageBuyingPrice: 0,
      },
      errorMessages: {
        productName: "",
        groupId: "",
        categoryId: "",
        menuId: "",
        brief_description: "",
        brandId: "",
        unit: "",
        model: "",
        sellingPrice: "",
        productImage: "",
        description: "",
      },
      editErrorMessages: {
        productName: "",
        groupId: "",
        categoryId: "",
        menuId: "",
        brief_description: "",
        brandId: "",
        unit: "",
        model: "",
        sellingPrice: "",
        productImage: "",
        description: "",
      },
      index: -1,
      limit: 5,
      dataCategory: [],
      dataSubcategory: [],
      dataEditSubcategory: [],
      products: [],
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

    handleImageSuccess(res, file) {
      res = `http://localhost:8000/images/${res}`;
      this.imageName = res;

      if (this.isEditingItem) {
        console.log("inside");
        return (this.editValue.productImage = res);
      } else {
        this.formValue.productImage = res;
      }
    },

    async handleRemove(file, fileList) {
      let image = this.formValue.productImage;
      // this.editData.image =
      //   "https://cameraworldapi.dreamsgallerybd.com/profileImages/download.jpg";
      this.$refs.editDataUploads.clearFiles();
      const res = await this.callApi("post", "/app/delete_image", {
        imageName: image,
      });
      if (res.status != 200) {
        this.formValue.productImage = image;
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
        desc: `${
          file.errors.file.length
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

    // changeMenu(query){
    //     this.categoryValue.menuId=query
    // },

    clearErrorMessage() {
      this.errorMessages = {
        productName: "",
        groupId: "",
        categoryId: "",
        menuId: "",
        brief_description: "",
        brandId: "",
        unit: "",
        model: "",
        sellingPrice: "",
        productImage: "",
        description: "",
      };
      this.editErrorMessages = {
        productName: "",
        groupId: "",
        categoryId: "",
        menuId: "",
        brief_description: "",
        brandId: "",
        unit: "",
        model: "",
        sellingPrice: "",
        productImage: "",
        description: "",
      };
    },
    showEdit(index) {
      this.clearErrorMessage();
      if (this.products[index].id) {
        this.isEditingItem = true;
        this.index = index;
        this.editValue.id = this.products[index].id;
        this.editValue.productName = this.products[index].productName;
        this.editValue.groupId = this.products[index].groupId;
        this.getEditSubcategory(this.editValue.groupId);
        this.editValue.categoryId = this.products[index].categoryId;
        this.editValue.brief_description =
          this.products[index].brief_description;
        this.editValue.sellingPrice = this.products[index].sellingPrice;
        this.editValue.productImage = this.products[index].productImage;
        this.imageName = this.products[index].productImage;

        this.editModal = true;
      }
    },
    async productUpdate() {
      let validation = true;
      this.clearErrorMessage();
      if (
        this.editValue.productName == "" ||
        this.editValue.productName.trim() == ""
      ) {
        validation = false;
        this.editErrorMessages.productName = "Product Name is required!";
      }

      if (this.editValue.groupId == "") {
        validation = false;
        this.editErrorMessages.groupId = "Category is required!";
      }

      if (this.editValue.categoryId == "") {
        validation = false;
        this.editErrorMessages.categoryId = "Subcategory is required!";
      }

      if (this.editValue.brief_description == "") {
        validation = false;
        this.editErrorMessages.brief_description = "Description is required!";
      }

      if (this.editValue.sellingPrice <= 0) {
        validation = false;
        this.editErrorMessages.sellingPrice =
          "Please give a valid selling price!";
      }

      if (validation == false) return this.$Message.error("Validation Failed!");
      this.editValue.brief_description =
        "<p>" + this.editValue.brief_description + "</p>";
      this.sending = true;
      const res = await this.callApi(
        "post",
        "/app/main_product_update",
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
            // this.e(res.data.errors[i][0]);
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
        this.formValue.productName == "" ||
        this.formValue.productName.trim() == ""
      ) {
        validation = false;
        this.errorMessages.productName = "Product Name is required!";
      }

      if (this.formValue.groupId == "") {
        validation = false;
        this.errorMessages.groupId = "Category is required!";
      }

      if (this.formValue.categoryId == "") {
        validation = false;
        this.errorMessages.categoryId = "Subcategory is required!";
      }

      if (this.formValue.brief_description == "") {
        validation = false;
        this.errorMessages.brief_description = "Description is required!";
      }

      if (this.formValue.sellingPrice <= 0) {
        validation = false;
        this.errorMessages.sellingPrice = "Please give a valid selling price!";
      }

      if (validation == false) return this.$Message.error("Validation Failed!");
      this.formValue.brief_description =
        "<p>" + this.formValue.brief_description + "</p>";
      this.loading = true;
      const res = await this.callApi(
        "post",
        "/app/main_product",
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
        `/app/main_product?limit=${this.limit}`
      );
      if (response.status == 200) {
        this.products = response.data.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.isDataLoading = false;
    },
    async loadMore(more = 20) {
      console.log("Load more is calling! length", this.products.length);

      if (this.noProductRemaining) return;

      this.limit = this.limit + more;
      this.loadMoreLoading = true;
      const res = await this.callApi(
        "get",
        `/app/main_product?limit=${this.limit}`
      );
      if (res.status == 200) {
        let prevLength = this.products.length;
        if (this.products.length == res.data.data.length) {
          this.noProductRemaining = true;
        }
        for (let i in res.data.data) {
          console.log("pushing data");
          let d = res.data.data[i];
          if (i >= prevLength) {
            this.products.push(d);
          }
        }
      }
      this.loadMoreLoading = false;
      console.log("Load more is finished! length", this.products.length);
    },
    async getCategory(k) {
      this.formValue.groupId = "";
      const response = await this.callApi(
        "get",
        `/app/group?limit=${this.limit}`
      );
      if (response.status == 200) {
        this.dataCategory = response.data.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
    },
    async getEditSubcategory(k) {
      this.subcategoryValue.group_id = k;
      this.editValue.categoryId = "";
      const response = await this.callApi(
        "get",
        `/app/category?groupId=${this.editValue.groupId}`
      );
      if (response.status == 200) {
        this.dataEditSubcategory = response.data.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
    },
    async getSubcategory(k) {
      this.subcategoryValue.group_id = k;
      this.formValue.categoryId = "";
      const response = await this.callApi(
        "get",
        `/app/category?groupId=${this.formValue.groupId}`
      );
      if (response.status == 200) {
        this.dataSubcategory = response.data.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
    },
    async deleteProduct(index) {
      let id = this.products[index].id;
      const res = await this.callApi("post", `/app/main_product/${id}`);
      if (res.status == 201) {
        this.products.splice(index, 1);
        this.s("Deleted");
      } else this.swr();
    },
  },

  async created() {
    this.getCategory();
    this.getProduct();
  },
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
