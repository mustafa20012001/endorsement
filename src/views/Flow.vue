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
        <h2 class="h5 fw-bold m-2">شعبة البيانات والتدقيق</h2>
        <small class="text-muted"> إدارة معاملات التدقيق </small>
      </div>
    </div>
  </div>

  <!-- Search Bar -->
  <div class="card shadow-sm border-0 mb-3 p-3">
    <div class="row g-3">
      <!-- اسم الجريح -->
      <div class="col-md-6">
        <input
          v-model="filters.injuredName"
          class="form-control"
          placeholder="بحث بالاسم..."
        />
      </div>

      <!-- الأزرار -->
      <div class="col-md-6 d-flex justify-content-end gap-2 align-items-end">
        <button class="btn-search" @click="load()">بحث</button>
        <button class="btn-advanced" @click="openAdvanced()">بحث متقدم</button>
        <button class="btn-advanced" @click="resetFilters()">
          إعادة تعيين
        </button>
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
                <th>تاريخ استلام المعاملة</th>
                <th>تاريخ تسليم المعاملة</th>
                <th>تاريخ استلام الطبيب العسكري</th>
                <th>تاريخ تسليم الطبيب العسكري</th>
                <th>تاريخ استلام التدقيق</th>
                <th>تاريخ تسليم التدقيق</th>
                <th>الموقف</th>
                <th>الملاحظات</th>
                <th>أضيف بواسطة</th>
                <th>تاريخ الإضافة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, idx) in list" :key="item.id">
                <td>{{ (page - 1) * pageSize + idx + 1 }}</td>
                <td>{{ item.injuredName || "-" }}</td>
                <td>{{ item.incomingSubject }}</td>
                <td>{{ formatDate(item.transactionReceiveDate) }}</td>
                <td>{{ formatDate(item.transactionDeliveryDate) }}</td>
                <td>{{ formatDate(item.militaryDoctorReceive) }}</td>
                <td>{{ formatDate(item.militaryDoctorDelivery) }}</td>
                <td>{{ formatDate(item.verificationReceive) }}</td>
                <td>{{ formatDate(item.verificationDelivery) }}</td>
                <td>
                  <div v-if="item.situations && item.situations.length">
                    <span
                      v-for="(s, i) in item.situations"
                      :key="i"
                      class="badge bg-info mx-1"
                    >
                      {{ s.situationNumber }} - {{ s.situationName }}
                    </span>
                  </div>
                  <span v-else class="text-muted">-</span>
                </td>
                <td class="text-truncate" style="max-width: 180px">
                  {{ item.notes || "-" }}
                </td>
                <td>{{ item.createdByUserName }}</td>
                <td>{{ formatDate(item.createdAt) }}</td>

                <td>
                  <div class="d-flex justify-content-center gap-2">
                    <!-- عرض -->
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

                    <!-- <button class="btn btn-primary" @click="openAdd()">
                      إضافة تدقيق جديد
                    </button> -->

                    <!-- تعديل -->
                    <button class="button-edit" @click="openEdit(item)">
                      <svg class="svgIcon" viewBox="0 0 512 512">
                        <path
                          d="M290.74 93.24l-197.5 197.5c-2.5 2.5-4.1 
                            5.7-4.6 9.1l-12 84c-1.1 7.5 5.3 13.9 
                            12.8 12.8l84-12c3.4-.5 6.6-2.1 
                            9.1-4.6l197.5-197.5-89.3-89.3z 
                            M497.9 56.69l-42.6-42.6c-18.7-18.7-49.1-18.7-67.9 
                            0l-39.1 39.1 89.3 89.3 39.1-39.1c18.8-18.7 
                            18.8-49.1 0-67.9z"
                        />
                      </svg>
                    </button>

                    <!-- حذف -->
                    <button class="button" @click="remove(item.id)">
                      <svg class="svgIcon" viewBox="0 0 448 512">
                        <path
                          d="M135.2 17.7L128 32H32c-17.7 0-32 14.3-32 32s14.3 32 
                             32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 
                             6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 
                             128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h246c25.3 
                             0 46.3-19.7 47.9-45L416 128z"
                        />
                      </svg>
                    </button>

                    <!-- تحويل -->
                    <button class="button-transfer" @click="openTransfer(item)">
                      <svg class="svgIcon" viewBox="0 0 512 512">
                        <path
                          d="M492.7 273.4L400 366.1c-15 15-41 4.5-41-17V320H208c-22.1 
                             0-40-17.9-40-40v-48c0-22.1 17.9-40 40-40h151V162c0-21.5 
                             26-32 41-17l92.7 92.7c9.4 9.4 9.4 24.6 0 
                             34.1zM20 238.6l92.7-92.7c15-15 41-4.5 41 17v42h151c22.1 
                             0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H153v29.1c0 21.5-26 
                             32-41 17L20 273.4c-9.4-9.4-9.4-24.6 0-34.1z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="list.length === 0">
                <td colspan="13" class="py-4 text-muted">
                  <i class="bi bi-inboxes fs-1 d-block mb-2"></i>
                  لا توجد بيانات
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Pagination -->
  <nav class="circle-pagination d-flex justify-content-center mt-4">
    <button
      class="page-btn"
      :disabled="page === 1"
      @click="changePage(page - 1)"
    >
      <i class="bi bi-chevron-right"></i>
    </button>

    <button
      class="page-number"
      v-for="p in visiblePages"
      :key="p"
      :class="{ active: p === page }"
      @click="changePage(p)"
    >
      {{ p }}
    </button>

    <button
      class="page-btn"
      :disabled="page === totalPages"
      @click="changePage(page + 1)"
    >
      <i class="bi bi-chevron-left"></i>
    </button>
  </nav>

  <!-- Add/Edit Modal -->
  <div class="modal fade" tabindex="-1" ref="modalEl">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ editMode ? "تعديل بيانات التدقيق" : "إضافة بيانات للتدقيق" }}
          </h5>
        </div>

        <form @submit.prevent="save">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">تاريخ استلام المعاملة</label>
                <input
                  v-model="form.transactionReceiveDate"
                  type="date"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">تاريخ تسليم المعاملة</label>
                <input
                  v-model="form.transactionDeliveryDate"
                  type="date"
                  class="form-control"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">تاريخ استلام الطبيب العسكري</label>
                <input
                  v-model="form.militaryDoctorReceive"
                  type="date"
                  class="form-control"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">تاريخ تسليم الطبيب العسكري</label>
                <input
                  v-model="form.militaryDoctorDelivery"
                  type="date"
                  class="form-control"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">تاريخ استلام لجنة التدقيق</label>
                <input
                  v-model="form.verificationReceive"
                  type="date"
                  class="form-control"
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">تاريخ تسليم لجنة التدقيق</label>
                <input
                  v-model="form.verificationDelivery"
                  type="date"
                  class="form-control"
                />
              </div>

              <div class="col-md-12">
                <label class="form-label">الملاحظات</label>
                <textarea
                  v-model="form.notes"
                  class="form-control"
                  rows="3"
                  placeholder="ملاحظات حول حالة المعاملة..."
                ></textarea>
              </div>

              <div class="col-12">
                <label class="form-label mb-2">الموقف </label>

                <div class="situations-wrapper">
                  <div
                    class="situation-chip"
                    v-for="(s, i) in form.situations"
                    :key="i"
                  >
                    <input
                      v-model="s.situationNumber"
                      class="chip-input number"
                      placeholder="رقم"
                    />
                    <input
                      v-model="s.situationName"
                      class="chip-input name"
                      placeholder="اسم الموقف..."
                    />

                    <button
                      type="button"
                      class="chip-remove"
                      @click="removeSituationRow(i)"
                      :disabled="form.situations.length === 1"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>

                  <!-- زر الإضافة -->
                  <button
                    type="button"
                    class="chip-add"
                    @click="addSituationRow"
                  >
                    <i class="bi bi-plus-circle"></i> إضافة موقف
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-light" @click="close()">
              إلغاء
            </button>
            <button type="submit" class="btn btn-add">
              {{ editMode ? "حفظ التعديل" : "إضافة" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Transfer Modal -->
  <div class="modal fade" tabindex="-1" ref="transferModalEl">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">تحويل إلى قسم آخر</h5>
        </div>

        <form @submit.prevent="transfer">
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-12">
                <label class="form-label">القسم</label>
                <select
                  v-model="transferForm.departmentId"
                  class="form-select"
                  required
                >
                  <option value="">اختر القسم</option>
                  <option
                    v-for="dept in departments"
                    :key="dept.id"
                    :value="dept.id"
                  >
                    {{ dept.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-12">
                <label class="form-label">ملاحظات</label>
                <textarea
                  v-model="transferForm.notes"
                  class="form-control"
                  rows="3"
                  placeholder="سبب التحويل أو ملاحظات إضافية..."
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-light"
              type="button"
              @click="closeTransfer()"
            >
              إلغاء
            </button>
            <button class="btn btn-primary" :disabled="transferLoading">
              <span
                v-if="transferLoading"
                class="spinner-border spinner-border-sm me-1"
              ></span>
              تحويل
            </button>
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
            <div class="col-md-12">
              <label class="form-label">موضوع الوارد</label>
              <input
                class="form-control"
                :value="selected.incomingSubject"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">تاريخ استلام المعاملة</label>
              <input
                class="form-control"
                :value="formatDate(selected.transactionReceiveDate)"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">تاريخ تسليم المعاملة</label>
              <input
                class="form-control"
                :value="formatDate(selected.transactionDeliveryDate)"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">استلام الطبيب العسكري</label>
              <input
                class="form-control"
                :value="formatDate(selected.militaryDoctorReceive)"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">تسليم الطبيب العسكري</label>
              <input
                class="form-control"
                :value="formatDate(selected.militaryDoctorDelivery)"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">استلام التدقيق</label>
              <input
                class="form-control"
                :value="formatDate(selected.verificationReceive)"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">تسليم التدقيق</label>
              <input
                class="form-control"
                :value="formatDate(selected.verificationDelivery)"
                disabled
              />
            </div>

            <div class="col-md-12">
              <label class="form-label">الملاحظات</label>
              <textarea
                class="form-control"
                rows="3"
                :value="selected.notes"
                disabled
              ></textarea>
            </div>

            <div class="col-md-12">
              <label class="form-label">الموقف</label>

              <div class="badges-box">
                <template
                  v-if="selected.situations && selected.situations.length"
                >
                  <span
                    v-for="(s, i) in selected.situations"
                    :key="i"
                    class="badge-tag"
                  >
                    {{ s.situationNumber }} - {{ s.situationName }}
                  </span>
                </template>

                <span v-else class="text-muted">لا يوجد موقف مسجل</span>
              </div>
            </div>

            <div class="col-md-6">
              <label class="form-label">أضيف بواسطة</label>
              <input
                class="form-control"
                :value="selected.createdByUserName"
                disabled
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">تاريخ الإضافة</label>
              <input
                class="form-control"
                :value="formatDate(selected.createdAt)"
                disabled
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" type="button" @click="closeView()">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Advanced Search Modal -->
  <div
    class="modal fade"
    ref="advancedModal"
    tabindex="-1"
    @hidden.bs.modal="resetFilters"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content shadow-sm border-0">
        <div class="modal-header">
          <h5 class="modal-title fw-bold primary">بحث متقدم</h5>
        </div>

        <div class="modal-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">موضوع الوارد</label>
              <input
                v-model="filters.incomingId"
                class="form-control"
                placeholder="بحث بواسطة موضوع"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">من تاريخ استلام المعاملة</label>
              <input
                v-model="filters.transactionReceiveDateFrom"
                type="date"
                class="form-control"
              />
            </div>

            <div class="col-md-6">
              <label class="form-label">إلى تاريخ استلام المعاملة</label>
              <input
                v-model="filters.transactionReceiveDateTo"
                type="date"
                class="form-control"
              />
            </div>

            <!-- <div class="col-md-6">
              <label class="form-label">أضيف بواسطة</label>
              <select v-model="filters.createdByUserId" class="form-select">
                <option value="">الكل</option>
                <option v-for="u in users" :key="u.id" :value="u.id">
                  {{ u.fullName }}
                </option>
              </select>
            </div> -->
          </div>
        </div>

        <div class="modal-footer d-flex justify-content-between">
          <button class="btn btn-light" @click="closeAdvanced()">إغلاق</button>
          <button class="btn btn-add" @click="applyAdvanced()">تطبيق</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { Modal } from "bootstrap";
import { useRoute } from "vue-router";

import {
  getAuditingAndData,
  addAuditingAndData,
  updateAuditingAndData,
  deleteAuditingAndData,
  transferAuditingAndData,
} from "@/services/auditing-and-data.service.js";

import { getDepartments } from "@/services/departments.service.js";
import { successAlert, errorAlert, confirmDelete } from "@/utils/alert.js";

const route = useRoute();
const incomingIdFromRoute = route.query.incomingId || null;

// ===== بيانات الجدول =====
const list = ref([]);
const loading = ref(false);

// ===== الفلاتر =====
const filters = reactive({
  injuredName: "", // خارج المودال
  incomingId: "",
  transactionReceiveDateFrom: "",
  transactionReceiveDateTo: "",
  createdByUserId: "",
  pageNumber: 1,
  pageSize: 10,
});

// ===== Pagination =====
const page = ref(1);
const pageSize = 10;
const totalPages = ref(1);

const visiblePages = computed(() => {
  const pages = [];
  let start = page.value - 1;
  if (start < 1) start = 1;

  let end = start + 2;
  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, end - 2);
  }

  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

// ===== الأقسام للتحويل =====
const departments = ref([]);

// ===== مودالات =====
const modalEl = ref(null);
const transferModalEl = ref(null);
const viewModalEl = ref(null);
let modal = null;
let transferModal = null;
let viewModal = null;
const editMode = ref(false);

// ===== فورم الإضافة/التعديل =====
const form = reactive({
  id: "",
  incomingId: incomingIdFromRoute, // لو الصفحة افتحت من مسار وارد معين
  transactionReceiveDate: "",
  transactionDeliveryDate: "",
  militaryDoctorReceive: "",
  militaryDoctorDelivery: "",
  verificationReceive: "",
  verificationDelivery: "",
  notes: "",
  situations: [
    {
      situationNumber: "1",
      situationName: "",
    },
  ],
});

// ===== فورم التحويل =====
const transferForm = reactive({
  auditingAndDataId: "",
  departmentId: "",
  notes: "",
});

const transferLoading = ref(false);

// ===== Selected for view =====
const selected = ref(null);

// ===== تحميل البيانات =====
const load = async () => {
  loading.value = true;
  try {
    // الأساسيات
    const params = {
      pageNumber: page.value,
      pageSize,
    };

    // إضافة الفلاتر فقط إذا لها قيمة
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        params[key] = value;
      }
    });

    const res = await getAuditingAndData(params);

    list.value = res.data.data ?? [];
    totalPages.value = res.data.pagination?.totalPages ?? 1;
  } catch (e) {
    console.error(e);
    errorAlert("فشل في جلب بيانات التدقيق");
  } finally {
    loading.value = false;
  }
};

const resetFilters = () => {
  Object.assign(filters, {
    injuredName: "",
    incomingId: "",
    transactionReceiveDateFrom: "",
    transactionReceiveDateTo: "",
    createdByUserId: "",
  });
  load();
};

// ===== تحميل الأقسام للتحويل =====
const loadDepartments = async () => {
  try {
    const res = await getDepartments({ pageNumber: 1, pageSize: 100 });
    departments.value = res.data.data;
  } catch (error) {
    console.error("Error loading departments:", error);
  }
};

// ===== إضافة =====
const openAdd = () => {
  editMode.value = false;

  // تفريغ كل الحقول
  Object.assign(form, {
    id: "",
    incomingId: incomingIdFromRoute || null,
    transactionReceiveDate: "",
    transactionDeliveryDate: "",
    militaryDoctorReceive: "",
    militaryDoctorDelivery: "",
    verificationReceive: "",
    verificationDelivery: "",
    notes: "",
    situations: [
      {
        situationNumber: "1",
        situationName: "",
      },
    ],
  });

  modal.show();
};

// ===== تعديل =====
const openEdit = (row) => {
  editMode.value = true;

  Object.assign(form, {
    id: row.id,
    incomingId: row.incomingId || incomingIdFromRoute || null,
    transactionReceiveDate: row.transactionReceiveDate
      ? row.transactionReceiveDate.slice(0, 10)
      : "",
    transactionDeliveryDate: row.transactionDeliveryDate
      ? row.transactionDeliveryDate.slice(0, 10)
      : "",
    militaryDoctorReceive: row.militaryDoctorReceive
      ? row.militaryDoctorReceive.slice(0, 10)
      : "",
    militaryDoctorDelivery: row.militaryDoctorDelivery
      ? row.militaryDoctorDelivery.slice(0, 10)
      : "",
    verificationReceive: row.verificationReceive
      ? row.verificationReceive.slice(0, 10)
      : "",
    verificationDelivery: row.verificationDelivery
      ? row.verificationDelivery.slice(0, 10)
      : "",
    notes: row.notes || "",
    situations: row.situations?.map((s, i) => ({
      situationNumber: s.situationNumber || String(i + 1),
      situationName: s.situationName || "",
    })) || [
      {
        situationNumber: "1",
        situationName: "",
      },
    ],
  });

  modal.show();
};

// إدارة أسطر الموقف
const addSituationRow = () => {
  form.situations.push({
    situationNumber: String(form.situations.length + 1),
    situationName: "",
  });
};

const removeSituationRow = (index) => {
  if (form.situations.length === 1) return;
  form.situations.splice(index, 1);
};

// ===== حفظ (إضافة/تعديل) =====
const save = async () => {
  const data = {
    incomingId: form.incomingId,
    transactionReceiveDate: form.transactionReceiveDate || null,
    transactionDeliveryDate: form.transactionDeliveryDate || null,
    militaryDoctorReceive: form.militaryDoctorReceive || null,
    militaryDoctorDelivery: form.militaryDoctorDelivery || null,
    verificationReceive: form.verificationReceive || null,
    verificationDelivery: form.verificationDelivery || null,
    notes: form.notes || null,
    situations: form.situations
      .filter((s) => s.situationName || s.situationNumber)
      .map((s) => ({
        situationNumber: s.situationNumber || "",
        situationName: s.situationName || "",
      })),
  };

  try {
    if (!editMode.value) {
      await addAuditingAndData(data);
      successAlert("تمت إضافة بيانات التدقيق بنجاح");
    } else {
      await updateAuditingAndData(form.id, data);
      successAlert("تم تحديث بيانات التدقيق بنجاح");
    }

    modal.hide();
    load();
  } catch (e) {
    console.error(e);
    errorAlert("حدث خطأ أثناء الحفظ");
  }
};

// ===== حذف =====
const remove = async (id) => {
  const result = await confirmDelete();
  if (result.isConfirmed) {
    try {
      await deleteAuditingAndData(id);
      successAlert("تم الحذف بنجاح");
      load();
    } catch (e) {
      errorAlert("فشل الحذف");
    }
  }
};

const close = () => modal.hide();

// ===== فتح مودال التحويل =====
const openTransfer = (row) => {
  transferForm.auditingAndDataId = row.id;
  transferForm.departmentId = "";
  transferForm.notes = "";
  transferModal.show();
};

// ===== تنفيذ التحويل =====
const transfer = async () => {
  transferLoading.value = true;
  try {
    const body = {
      auditingAndDataId: transferForm.auditingAndDataId,
      departmentId: transferForm.departmentId,
      notes: transferForm.notes || null,
    };

    await transferAuditingAndData(body);
    transferModal.hide();
    successAlert("تم تحويل المعاملة بنجاح");
    load();
  } catch (error) {
    console.error("Error transferring AuditingAndData:", error);
    errorAlert("حدث خطأ أثناء التحويل");
  } finally {
    transferLoading.value = false;
  }
};

const closeTransfer = () => transferModal.hide();

// ===== View (قراءة فقط) =====
const openView = (row) => {
  selected.value = row;
  viewModal.show();
};

const closeView = () => {
  viewModal.hide();
  selected.value = null;
};

const advancedModal = ref(null);
let modalAdvancedInstance = null;

const openAdvanced = () => {
  if (!modalAdvancedInstance) {
    modalAdvancedInstance = new Modal(advancedModal.value);
  }
  modalAdvancedInstance.show();
};

const applyAdvanced = () => {
  page.value = 1; // نرجع لأول صفحة عند البحث
  load();
  closeAdvanced();
};

const closeAdvanced = () => {
  modalAdvancedInstance?.hide();
};

// ===== التاريخ =====
const formatDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "-";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dt);
};

// ===== تغيير الصفحة =====
const changePage = (p) => {
  page.value = p;
  load();
};

// ===== INIT =====
onMounted(() => {
  modal = new Modal(modalEl.value);
  transferModal = new Modal(transferModalEl.value);
  viewModal = new Modal(viewModalEl.value);
  load();
  loadDepartments();
});
</script>

<style scoped>
.situations-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 14px;
  border-radius: 12px;
}

.situation-chip {
  display: flex;
  gap: 8px;
  align-items: center;
  background: white;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d0d7de;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
}

.situation-chip:hover {
  border-color: #12b1d1;
  box-shadow: 0 3px 8px rgba(18, 177, 209, 0.15);
}

.chip-input {
  border: none;
  outline: none;
  background: transparent;
}

.chip-input.number {
  width: 55px;
  text-align: center;
  font-weight: 600;
  color: #12b1d1;
}

.chip-input.name {
  flex: 1;
}

.chip-remove {
  border: none;
  background: rgba(220, 53, 69, 0.12);
  color: #dc3545;
  border-radius: 8px;
  padding: 6px 9px;
  transition: 0.2s;
}

.chip-remove:hover {
  background: #dc3545;
  color: white;
}

.chip-add {
  border: none;
  background: #12b1d1;
  color: white;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  align-self: flex-start;
  transition: 0.2s;
}

.chip-add:hover {
  background: #0e90ab;
}

.custom-table thead th {
  /* background: #f8fdff; */
  color: #222;
  font-weight: 700;
  padding: 14px;
  white-space: nowrap;
  border-bottom: 2px solid #d7e6ee !important;
}

.custom-table td {
  /* padding: 14px 10px; */
  vertical-align: middle;
  font-size: 15px;
  white-space: nowrap;
}

.custom-table tbody tr {
  border-bottom: 1px solid #ecf3f7;
}

.custom-table tbody tr:last-child {
  border-bottom: none;
}

.table-responsive {
  overflow-x: auto;
  padding-bottom: 8px;
}

.table-responsive::-webkit-scrollbar {
  height: 8px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: #12b1d1;
  border-radius: 12px;
}

.badge.bg-info {
  background: #11b2d2 !important;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 20px;
}
</style>
