<template>
  <!-- App Bar -->
  <div
    class="appbar rounded-3 p-3 mb-3 d-flex justify-content-between align-items-center"
  >
    <div class="d-flex align-items-center gap-2">
      <span
        class="appbar-icon d-inline-flex align-items-center justify-content-center"
      >
        <i class="bi bi-shield-check"></i>
      </span>
      <div>
        <h2 class="h5 fw-bold m-2">المراسلات</h2>
        <small class="text-muted">إدارة معاملات التدقيق</small>
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="card shadow-sm border-0 mb-4">
    <div class="card-header custom-card-header">
      <h5 class="mb-0 fw-bold primary">قائمة معاملات التدقيق</h5>
    </div>

    <div class="card-body">
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border"></div>
      </div>

      <div v-else class="card inner-card">
        <div class="table-responsive">
          <table class="table custom-table align-middle text-center mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>اسم الجريح</th>
                <th>موضوع الوارد</th>
                <th>أضيف بواسطة</th>
                <th>تاريخ الإضافة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, idx) in list" :key="item.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ item.injuredName }}</td>
                <td>{{ item.incomingSubject }}</td>
                <td>{{ item.createdByUserName }}</td>
                <td>{{ formatDate(item.createdAt) }}</td>

                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button class="button-add" @click="openAdd(item)">
                      <svg class="svgIcon" viewBox="0 0 448 512">
                        <path
                          d="M432 256c0 17.7-14.3 32-32 32h-128v128c0 17.7-14.3 32-32 
                          32s-32-14.3-32-32V288H80c-17.7 0-32-14.3-32-32s14.3-32 
                          32-32h128V96c0-17.7 14.3-32 32-32s32 14.3 
                          32 32v128h128c17.7 0 32 14.3 32 32z"
                        />
                      </svg>
                    </button>
                    <button class="button-view" @click="openView(item)">
                      <svg class="svgIcon" viewBox="0 0 576 512">
                        <path
                          d="M572.52 241.4C518.29 135.59 407.81 64 288 
                            64S57.71 135.59 3.48 241.4a48.07 48.07 
                            0 000 45.2C57.71 376.41 168.19 448 288 
                            448s230.29-71.59 284.52-161.4a48.07 48.07 
                            0 000-45.2zM288 400c-88.22 0-168.48-48.33-211.86-128C119.52 
                            192.33 199.78 144 288 144s168.48 48.33 
                            211.86 128C456.48 351.67 376.22 400 288 
                            400zm0-208a80 80 0 1080 80 80.09 80.09 
                            0 00-80-80z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="list.length === 0">
                <td colspan="6" class="py-4 text-muted">لا توجد بيانات</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Modal -->
  <div class="modal fade" ref="modalAdd">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">إضافة بيانات التدقيق</h5>
        </div>

        <form @submit.prevent="save">
          <div class="modal-body">
            <!-- صندوق معلومات الجريح -->
            <div class="return-info-box mb-4">
              <div class="row g-3">
                <!-- اسم الجريح -->
                <div class="col-md-6">
                  <div class="info-row">
                    <span class="info-icon"
                      ><i class="bi bi-person-fill"></i
                    ></span>
                    <div class="info-text">
                      <span class="label">اسم الجريح</span>
                      <span class="value">{{ form.injuredName }}</span>
                    </div>
                  </div>
                </div>

                <!-- موضوع الوارد -->
                <div class="col-md-6">
                  <div class="info-row">
                    <span class="info-icon"
                      ><i class="bi bi-journal-text"></i
                    ></span>
                    <div class="info-text">
                      <span class="label">موضوع الوارد</span>
                      <span class="value">{{ form.incomingSubject }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <input type="hidden" v-model="form.incomingId" />

            <!-- الحقول -->
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">تاريخ استلام المعاملة</label>
                <input
                  type="datetime-local"
                  v-model="form.transactionReceiveDate"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">تاريخ تسليم المعاملة</label>
                <input
                  type="datetime-local"
                  v-model="form.transactionDeliveryDate"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">استلام الطبيب العسكري</label>
                <input
                  type="datetime-local"
                  v-model="form.militaryDoctorReceive"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">تسليم الطبيب العسكري</label>
                <input
                  type="datetime-local"
                  v-model="form.militaryDoctorDelivery"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">تاريخ استلام التدقيق</label>
                <input
                  type="datetime-local"
                  v-model="form.verificationReceive"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">تاريخ تسليم التدقيق</label>
                <input
                  type="datetime-local"
                  v-model="form.verificationDelivery"
                  class="form-control"
                />
              </div>

              <div class="col-md-12">
                <label class="form-label">الملاحظات</label>
                <textarea v-model="form.notes" class="form-control"></textarea>
              </div>
            </div>

            <!-- قسم المواقف -->
            <div class="mt-4 situations-box">
              <h6 class="fw-bold mb-5">المواقف</h6>

              <!-- العناصر -->
              <div
                class="row g-3 mb-4 mt-4 situation-item"
                v-for="(s, i) in form.situations"
                :key="i"
              >
                <div class="col-md-3">
                  <label class="small-label">رقم الموقف</label>
                  <input
                    v-model="s.situationNumber"
                    class="form-control"
                    placeholder="رقم الموقف"
                  />
                </div>

                <div class="col-md-8">
                  <label class="small-label">اسم الموقف</label>
                  <input
                    v-model="s.situationName"
                    class="form-control"
                    placeholder="اسم الموقف"
                  />
                </div>

                <div class="col-md-1 d-flex align-items-end">
                  <button
                    type="button"
                    class="btn btn-danger btn-sm remove-btn"
                    @click="form.situations.splice(i, 1)"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              <!-- زر الإضافة أسفل -->
              <div class="d-flex justify-content-start mt-3">
                <button
                  type="button"
                  class="btn btn-add btn-sm px-4"
                  @click="addSituation"
                >
                  <i class="bi bi-plus-lg"></i> إضافة موقف
                </button>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-light" type="button" @click="closeAdd">
              إغلاق
            </button>
            <button class="btn btn-primary">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  </div>

 <!-- View Modal -->
<div class="modal fade" tabindex="-1" ref="viewModalEl">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">تفاصيل معاملة التدقيق</h5>
      </div>

      <div class="modal-body" v-if="selected">

        <div class="row g-3">

          <!-- اسم الجريح -->
          <div class="col-md-12">
            <label class="form-label">اسم الجريح</label>
            <input
              class="form-control"
              :value="selected.injuredName"
              disabled
            />
          </div>

          <!-- موضوع الوارد -->
          <div class="col-md-12">
            <label class="form-label">موضوع الوارد</label>
            <input
              class="form-control"
              :value="selected.incomingSubject"
              disabled
            />
          </div>

          <!-- الملاحظات -->
          <div class="col-md-12">
            <label class="form-label">أضيف بواسطة</label>
            <textarea
              class="form-control"
              rows="3"
              disabled
            >{{ selected.createdByUserName }}</textarea>
          </div>

         

        </div>

      </div>

      <div class="modal-footer">
        <button class="btn btn-light" @click="closeView()">إغلاق</button>
      </div>

    </div>
  </div>
</div>

</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Modal } from "bootstrap";

import {
  getTransfers,
  addAuditingAndData,
} from "@/services/auditing-and-data.service.js";

import { successAlert, errorAlert } from "@/utils/alert.js";

const list = ref([]);
const loading = ref(false);

// مودالات
const modalAdd = ref(null);
let modalAddInstance = null;

// الفورم النهائي
const form = reactive({
  incomingId: "",
  injuredName: "",
  incomingSubject: "",
  transactionReceiveDate: "",
  transactionDeliveryDate: "",
  militaryDoctorReceive: "",
  militaryDoctorDelivery: "",
  verificationReceive: "",
  verificationDelivery: "",
  notes: "",

  situations: [{ situationNumber: "", situationName: "" }],
});

// عنصر العرض
const selected = ref(null);

// جلب المرسلات
const load = async () => {
  loading.value = true;
  try {
    const res = await getTransfers({});
    console.log("API RAW:", res);
    console.log("DATA:", res.data);
    console.log("LIST:", res.data.data);

    list.value = res?.data?.data || [];
  } catch (e) {
    console.error("Load ERROR:", e);
  } finally {
    loading.value = false;
  }
};

// زر الإضافة
const openAdd = (row) => {
  Object.assign(form, {
    incomingId: row.incomingId,
    injuredName: row.injuredName,
    incomingSubject: row.incomingSubject,

    transactionReceiveDate: "",
    transactionDeliveryDate: "",
    militaryDoctorReceive: "",
    militaryDoctorDelivery: "",
    verificationReceive: "",
    verificationDelivery: "",
    notes: "",
    situations: [{ situationNumber: "", situationName: "" }],
  });

  modalAddInstance.show();
};

const addSituation = () => {
  form.situations.push({ situationNumber: "", situationName: "" });
};

const save = async () => {
  const body = {
    incomingId: form.incomingId,

    transactionReceiveDate: form.transactionReceiveDate || null,
    transactionDeliveryDate: form.transactionDeliveryDate || null,

    militaryDoctorReceive: form.militaryDoctorReceive || null,
    militaryDoctorDelivery: form.militaryDoctorDelivery || null,

    verificationReceive: form.verificationReceive || null,
    verificationDelivery: form.verificationDelivery || null,

    notes: form.notes,

    situations: [...form.situations],
  };

  try {
    await addAuditingAndData(body);
    successAlert("تمت الإضافة بنجاح");
    modalAddInstance.hide();
    load();
  } catch (e) {
    errorAlert("فشل الحفظ");
  }
};



// إغلاق المودالات
const closeAdd = () => modalAddInstance.hide();
const closeView = () => modalViewInstance.hide();

// تنسيق التاريخ
const formatDate = (d) => {
  if (!d) return "-";
  return new Date(d).toLocaleDateString();
};

// مودال العرض
const viewModalEl = ref(null);
let modalViewInstance = null;

// عرض التفاصيل
const openView = (row) => {
  selected.value = row;
  modalViewInstance.show();
};

// إغلاق المودال
// const closeView = () => modalViewInstance.hide();

onMounted(() => {
  modalAddInstance = new Modal(modalAdd.value);
  modalViewInstance = new Modal(viewModalEl.value);
  load();
});
</script>
