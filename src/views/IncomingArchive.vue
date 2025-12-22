<template>
  <button class="button-archive" title="عرض المرفقات" @click="openArchive">
    <svg class="svgIcon" viewBox="0 0 512 512">
      <path
        d="M424.4 214.7L253.1 386c-35.2 35.2-92.3 35.2-127.5 0
           s-35.2-92.3 0-127.5L300.3 83.9c23.4-23.4 61.4-23.4
           84.9 0s23.4 61.4 0 84.9L224.6 329.4c-11.7 11.7-30.7
           11.7-42.4 0s-11.7-30.7 0-42.4L318.1 151c6.2-6.2
           6.2-16.4 0-22.6s-16.4-6.2-22.6 0L159.6 264.3
           c-23.4 23.4-23.4 61.4 0 84.9s61.4 23.4 84.9 0
           l160.6-160.6c35.2-35.2 35.2-92.3 0-127.5
           s-92.3-35.2-127.5 0L106.3 232.4"
      />
    </svg>
  </button>
  <div class="modal fade" ref="archiveModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="bi bi-folder2-open me-1"></i>
            مرفقات الوارد
          </h5>
        </div>

        <div class="modal-body">
          <div
            v-if="archiveFiles.length === 0"
            class="text-muted text-center py-4"
          >
            <i class="bi bi-inbox fs-1 d-block mb-2"></i>
            لا توجد مرفقات
          </div>

          <div v-else class="list-group">
            <button
              v-for="(file, i) in archiveFiles"
              :key="i"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              @click="openFile(file.fileFullUrl)"
            >
              <span>{{ file.fileName }}</span>
              <i class="bi bi-box-arrow-up-right"></i>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-light" @click="closeArchive">إلغاء</button>
          <button class="btn btn-primary" @click="openUpload">
            إضافة مرفقات
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" ref="uploadModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">رفع مرفقات</h5>
        </div>

        <div class="modal-body">
          <input
            type="file"
            multiple
            class="form-control"
            @change="onFilesSelected"
          />
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" @click="closeUpload">إلغاء</button>
          <button class="btn btn-primary" @click="upload">رفع</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import { uploadIncomingArchive } from "@/services/incoming-archive.service";
import { successAlert, errorAlert } from "@/utils/alert";
import { getIncomingArchive } from "@/services/incoming-archive.service";

/* =======================
     Props
  ======================= */
const props = defineProps({
  incomingId: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    default: () => [],
  },
});
const archiveFiles = ref([]);
const loadArchive = async () => {
  if (!props.incomingId) return;

  try {
    const res = await getIncomingArchive(props.incomingId);
    archiveFiles.value = res.data?.data || [];
  } catch (e) {
    console.error("فشل جلب المرفقات", e);
    archiveFiles.value = [];
  }
};

const emit = defineEmits(["uploaded"]);

/* =======================
     Refs
  ======================= */
const archiveModal = ref(null);
const uploadModal = ref(null);

let modalArchive = null;
let modalUpload = null;

const selectedFiles = ref([]);

/* =======================
     Methods
  ======================= */
const openArchive = async () => {
  await loadArchive();
  modalArchive.show();
};

const closeArchive = () => {
  modalArchive.hide();
};

const openUpload = () => {
  modalArchive.hide();
  modalUpload.show();
};

const closeUpload = () => {
  modalUpload.hide();
};

const onFilesSelected = (event) => {
  selectedFiles.value = Array.from(event.target.files);
};

const upload = async () => {
  if (!props.incomingId) {
    return errorAlert("المعاملة غير محددة");
  }

  if (selectedFiles.value.length === 0) {
    return errorAlert("يرجى اختيار ملفات");
  }

  try {
    await uploadIncomingArchive(props.incomingId, selectedFiles.value);
    successAlert("تم رفع المرفقات بنجاح");

    selectedFiles.value = [];
    modalUpload.hide();

    await loadArchive(); 
  } catch (e) {
    console.error(e);
    errorAlert("فشل رفع المرفقات");
  }
};
const openFile = (url) => {
  window.open(url, "_blank");
};
/* =======================
     Init
  ======================= */
onMounted(() => {
  modalArchive = new Modal(archiveModal.value);
  modalUpload = new Modal(uploadModal.value);
});
</script>
