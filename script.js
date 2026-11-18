/*
  راهنمای افزودن ویدئو:
  1) از آپارات، نشانی embed/تعبیه ویدئو را بردار.
  2) آن را در فیلد embedUrl قرار بده.
  3) اطلاعات نمونه زیر را با اطلاعات ویدئوی خودت عوض کن.
  4) برای افزودن آموزش دیگر، یک مورد جدید به آرایه VIDEOS اضافه کن.

  نکته: برای هر ویدئو از نشانی مخصوص embed که خود آپارات ارائه می‌کند استفاده کن.
*/
const JOIN_FORM_URL = "https://forms.gle/X8odbpxrQPHJybXz9";// نشانی فرم همکاری را اینجا قرار بده؛ مثال: https://...
const VIDEOS = [
  {
    id: 1,
    title: " آموزش مدارهای الکتریکی",
    course: "مدارهای الکتریکی",
    instructor: "نام مدرس را وارد کن",
    session: "جلسه ۱",
    description: "",
    embedUrl: "https://www.aparat.com/video/video/embed/videohash/p36ik6q/vt/frame"
  },
  {
    id: 2,
    title: " آموزش سیگنال‌ها و سیستم‌ها",
    course: "سیگنال‌ها و سیستم‌ها",
    instructor: "نام مدرس را وارد کن",
    session: "جلسه ۱",
    description: "",
    embedUrl: ""
  },
  {
    id: 3,
    title: " آموزش الکترونیک",
    course: "الکترونیک",
    instructor: "نام مدرس را وارد کن",
    session: "جلسه ۱",
    description: "",
    embedUrl: ""
  }
];

const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const joinButton = document.getElementById("joinButton");

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function fillCourseFilter() {
  const courses = [...new Set(VIDEOS.map(video => video.course).filter(Boolean))].sort((a, b) => a.localeCompare(b, "fa"));
  courses.forEach(course => {
    const option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    courseFilter.appendChild(option);
  });
}

function videoCard(video) {
  const frame = video.embedUrl
    ? `<iframe src="${safeText(video.embedUrl)}" title="${safeText(video.title)}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`
    : `<div class="video-placeholder"><div class="play-icon" aria-hidden="true">▶</div><strong>ویدئو به‌زودی اضافه می‌شود</strong><div>نشانی embed آپارات را در script.js وارد کن.</div></div>`;

  return `
    <article class="video-card">
      <div class="video-frame">${frame}</div>
      <div class="video-info">
        <span class="course-pill">${safeText(video.course)}</span>
        <h3>${safeText(video.title)}</h3>
        <p class="video-description">${safeText(video.description)}</p>
        <div class="video-meta">
          <strong>مدرس: ${safeText(video.instructor)}</strong>
          <span>${safeText(video.session)}</span>
        </div>
      </div>
    </article>`;
}

function renderVideos() {
  const query = searchInput.value.trim().toLocaleLowerCase("fa");
  const selectedCourse = courseFilter.value;
  const filtered = VIDEOS.filter(video => {
    const searchable = [video.title, video.course, video.instructor, video.description, video.session]
      .join(" ").toLocaleLowerCase("fa");
    return searchable.includes(query) && (selectedCourse === "all" || video.course === selectedCourse);
  });

  grid.innerHTML = filtered.map(videoCard).join("");
  resultsCount.textContent = `${filtered.length} آموزش`;
  emptyState.hidden = filtered.length !== 0;
}

function configureJoinButton() {
  if (JOIN_FORM_URL.trim()) {
    joinButton.href = JOIN_FORM_URL.trim();
    joinButton.target = "_blank";
    joinButton.rel = "noopener noreferrer";
  } else {
    joinButton.href = "mailto:?subject=" + encodeURIComponent("اعلام آمادگی همکاری با طرح هم‌مسیر");
  }
}

fillCourseFilter();
renderVideos();
configureJoinButton();
searchInput.addEventListener("input", renderVideos);
courseFilter.addEventListener("change", renderVideos);
