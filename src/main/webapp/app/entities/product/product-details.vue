<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="product">
        <h2 class="jh-entity-heading" data-cy="productDetailsHeading">
          <span v-text="$t('exampleVueApp.product.detail.title')">Product</span> {{ product.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('exampleVueApp.product.productCategoryEnum')">Product Category Enum</span>
          </dt>
          <dd>
            <span v-text="$t('exampleVueApp.ProductCategoryEnum.' + product.productCategoryEnum)">{{ product.productCategoryEnum }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.name')">Name</span>
          </dt>
          <dd>
            <span>{{ product.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.quantity')">Quantity</span>
          </dt>
          <dd>
            <span>{{ product.quantity }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.priceNet')">Price Net</span>
          </dt>
          <dd>
            <span>{{ product.priceNet }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.vat')">Vat</span>
          </dt>
          <dd>
            <span>{{ product.vat }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.priceGross')">Price Gross</span>
          </dt>
          <dd>
            <span>{{ product.priceGross }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.stock')">Stock</span>
          </dt>
          <dd>
            <span>{{ product.stock }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.description')">Description</span>
          </dt>
          <dd>
            <span>{{ product.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.createTime')">Create Time</span>
          </dt>
          <dd>
            <span v-if="product.createTime">{{ $d(Date.parse(product.createTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.updateTime')">Update Time</span>
          </dt>
          <dd>
            <span v-if="product.updateTime">{{ $d(Date.parse(product.updateTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('exampleVueApp.product.image')">Image</span>
          </dt>
          <dd>
            <div v-if="product.image">
              <a v-on:click="openFile(product.imageContentType, product.image)">
                <img
                  v-bind:src="'data:' + product.imageContentType + ';base64,' + product.image"
                  style="max-width: 100%"
                  alt="product image"
                />
              </a>
              {{ product.imageContentType }}, {{ byteSize(product.image) }}
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="product.id" :to="{ name: 'ProductEdit', params: { productId: product.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-details.component.ts"></script>
