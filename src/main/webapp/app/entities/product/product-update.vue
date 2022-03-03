<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="exampleVueApp.product.home.createOrEditLabel"
          data-cy="ProductCreateUpdateHeading"
          v-text="$t('exampleVueApp.product.home.createOrEditLabel')"
        >
          Create or edit a Product
        </h2>
        <div>
          <div class="form-group" v-if="product.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="product.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.productCategoryEnum')" for="product-productCategoryEnum"
              >Product Category Enum</label
            >
            <select
              class="form-control"
              name="productCategoryEnum"
              :class="{ valid: !$v.product.productCategoryEnum.$invalid, invalid: $v.product.productCategoryEnum.$invalid }"
              v-model="$v.product.productCategoryEnum.$model"
              id="product-productCategoryEnum"
              data-cy="productCategoryEnum"
              required
            >
              <option
                v-for="productCategoryEnum in productCategoryEnumValues"
                :key="productCategoryEnum"
                v-bind:value="productCategoryEnum"
                v-bind:label="$t('exampleVueApp.ProductCategoryEnum.' + productCategoryEnum)"
              >
                {{ productCategoryEnum }}
              </option>
            </select>
            <div v-if="$v.product.productCategoryEnum.$anyDirty && $v.product.productCategoryEnum.$invalid">
              <small
                class="form-text text-danger"
                v-if="!$v.product.productCategoryEnum.required"
                v-text="$t('entity.validation.required')"
              >
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.name')" for="product-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-name"
              data-cy="name"
              :class="{ valid: !$v.product.name.$invalid, invalid: $v.product.name.$invalid }"
              v-model="$v.product.name.$model"
              required
            />
            <div v-if="$v.product.name.$anyDirty && $v.product.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.name.minLength" v-text="$t('entity.validation.minlength', { min: 0 })">
                This field is required to be at least 0 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.product.name.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 5000 })"
              >
                This field cannot be longer than 5000 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.quantity')" for="product-quantity">Quantity</label>
            <input
              type="number"
              class="form-control"
              name="quantity"
              id="product-quantity"
              data-cy="quantity"
              :class="{ valid: !$v.product.quantity.$invalid, invalid: $v.product.quantity.$invalid }"
              v-model.number="$v.product.quantity.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.priceNet')" for="product-priceNet">Price Net</label>
            <input
              type="number"
              class="form-control"
              name="priceNet"
              id="product-priceNet"
              data-cy="priceNet"
              :class="{ valid: !$v.product.priceNet.$invalid, invalid: $v.product.priceNet.$invalid }"
              v-model.number="$v.product.priceNet.$model"
              required
            />
            <div v-if="$v.product.priceNet.$anyDirty && $v.product.priceNet.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.priceNet.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.priceNet.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.priceNet.max" v-text="$t('entity.validation.max', { max: 1000000 })">
                This field cannot be longer than 1000000 characters.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.priceNet.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.vat')" for="product-vat">Vat</label>
            <input
              type="number"
              class="form-control"
              name="vat"
              id="product-vat"
              data-cy="vat"
              :class="{ valid: !$v.product.vat.$invalid, invalid: $v.product.vat.$invalid }"
              v-model.number="$v.product.vat.$model"
              required
            />
            <div v-if="$v.product.vat.$anyDirty && $v.product.vat.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.vat.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.vat.min" v-text="$t('entity.validation.min', { min: 5 })">
                This field should be at least 5.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.vat.max" v-text="$t('entity.validation.max', { max: 100 })">
                This field cannot be longer than 100 characters.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.vat.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.priceGross')" for="product-priceGross">Price Gross</label>
            <input
              type="number"
              class="form-control"
              name="priceGross"
              id="product-priceGross"
              data-cy="priceGross"
              :class="{ valid: !$v.product.priceGross.$invalid, invalid: $v.product.priceGross.$invalid }"
              v-model.number="$v.product.priceGross.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.stock')" for="product-stock">Stock</label>
            <input
              type="number"
              class="form-control"
              name="stock"
              id="product-stock"
              data-cy="stock"
              :class="{ valid: !$v.product.stock.$invalid, invalid: $v.product.stock.$invalid }"
              v-model.number="$v.product.stock.$model"
              required
            />
            <div v-if="$v.product.stock.$anyDirty && $v.product.stock.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.stock.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.stock.min" v-text="$t('entity.validation.min', { min: 0 })">
                This field should be at least 0.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.stock.max" v-text="$t('entity.validation.max', { max: 1000000 })">
                This field cannot be longer than 1000000 characters.
              </small>
              <small class="form-text text-danger" v-if="!$v.product.stock.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.description')" for="product-description">Description</label>
            <textarea
              class="form-control"
              name="description"
              id="product-description"
              data-cy="description"
              :class="{ valid: !$v.product.description.$invalid, invalid: $v.product.description.$invalid }"
              v-model="$v.product.description.$model"
              required
            ></textarea>
            <div v-if="$v.product.description.$anyDirty && $v.product.description.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.description.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.product.description.minLength"
                v-text="$t('entity.validation.minlength', { min: 0 })"
              >
                This field is required to be at least 0 characters.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.product.description.maxLength"
                v-text="$t('entity.validation.maxlength', { max: 10000 })"
              >
                This field cannot be longer than 10000 characters.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.createTime')" for="product-createTime">Create Time</label>
            <div class="d-flex">
              <input
                id="product-createTime"
                data-cy="createTime"
                type="datetime-local"
                class="form-control"
                name="createTime"
                :class="{ valid: !$v.product.createTime.$invalid, invalid: $v.product.createTime.$invalid }"
                :value="convertDateTimeFromServer($v.product.createTime.$model)"
                @change="updateInstantField('createTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.updateTime')" for="product-updateTime">Update Time</label>
            <div class="d-flex">
              <input
                id="product-updateTime"
                data-cy="updateTime"
                type="datetime-local"
                class="form-control"
                name="updateTime"
                :class="{ valid: !$v.product.updateTime.$invalid, invalid: $v.product.updateTime.$invalid }"
                :value="convertDateTimeFromServer($v.product.updateTime.$model)"
                @change="updateInstantField('updateTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('exampleVueApp.product.image')" for="product-image">Image</label>
            <div>
              <img
                v-bind:src="'data:' + product.imageContentType + ';base64,' + product.image"
                style="max-height: 100px"
                v-if="product.image"
                alt="product image"
              />
              <div v-if="product.image" class="form-text text-danger clearfix">
                <span class="pull-left">{{ product.imageContentType }}, {{ byteSize(product.image) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('image', 'imageContentType', 'file_image')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <input
                type="file"
                ref="file_image"
                id="file_image"
                data-cy="image"
                v-on:change="setFileData($event, product, 'image', true)"
                accept="image/*"
                v-text="$t('entity.action.addimage')"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="image"
              id="product-image"
              data-cy="image"
              :class="{ valid: !$v.product.image.$invalid, invalid: $v.product.image.$invalid }"
              v-model="$v.product.image.$model"
              required
            />
            <input
              type="hidden"
              class="form-control"
              name="imageContentType"
              id="product-imageContentType"
              v-model="product.imageContentType"
            />
            <div v-if="$v.product.image.$anyDirty && $v.product.image.$invalid">
              <small class="form-text text-danger" v-if="!$v.product.image.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.product.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-update.component.ts"></script>
