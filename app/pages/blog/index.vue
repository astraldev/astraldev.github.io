<script setup lang="ts">
import type { TimelineItem } from "@nuxt/ui";
import { stagger } from "animejs";
import { format, parseISO } from "date-fns";

const BlogItem = "blog-index-item";

const FollowerDot = 12;

type FollowerBox = {
  x: number
  y: number
  width: number
  height: number
};

const IndexStyle = {
  header: "max-w-2xl",
  eyebrow: `${BlogItem} reveal font-semibold text-primary`,
  title: `${BlogItem} reveal mt-3 text-4xl font-bold text-pretty title-colors sm:text-5xl`,
  intro: `${BlogItem} reveal mt-4 text-lg subtitle-colors`,
  empty: `${BlogItem} reveal mt-12 subtitle-colors`,
  area: "relative isolate",
  areaPending: "stagger-pending",
  follower: {
    base: "pointer-events-none absolute top-0 left-0 -z-10"
      + " translate-x-(--follower-x) translate-y-(--follower-y) w-(--follower-w) h-(--follower-h)"
      + " rounded-xl bg-primary/5 ring-1 ring-primary/20"
      + " transition-[translate,width,height,opacity] duration-350 ease-out",
    snapping: "transition-none",
    visible: "opacity-100",
    hidden: "opacity-0",
  },
  filter: {
    root: "mt-10 text-sm subtitle-colors",
    tag: "font-semibold text-primary",
    clear: "text-primary decoration-wavy underline-offset-4 hover:underline",
  },
  timeline: {
    root: "mt-14 max-w-2xl",
    item: "gap-4 stagger-in",
    container: "gap-2",
    separator: "w-px bg-primary/20",
  },
  year: {
    indicator: "size-4 bg-primary",
    label: "pb-6 font-mono text-lg/4 font-semibold title-colors",
  },
  post: {
    indicator: "mt-4 size-3 bg-transparent ring-2 ring-inset ring-primary/60",
    row: "group/post relative -mt-1 mb-6 px-4 py-3",
    meta: "mb-1 text-sm subtitle-colors",
    tag: "relative z-10 text-dimmed decoration-wavy decoration-primary underline-offset-4 transition-colors"
      + " hover:text-primary hover:underline",
    title: "text-xl font-semibold text-pretty title-colors transition-colors group-hover/post:text-primary",
    titleLink: "after:absolute after:inset-0",
    description: "mt-1 line-clamp-4 subtitle-colors",
  },
} as const;

const route = useRoute();
const mounted = useMounted();

const area = useTemplateRef("area");
const follower = useTemplateRef("follower");

const headerDone = ref(false);
const listDone = ref(false);
const hoveredRow = shallowRef<HTMLElement | null>(null);
const followerSnapping = ref(false);
const followerBox = shallowRef<FollowerBox>({
  x: 0,
  y: 0,
  width: FollowerDot,
  height: FollowerDot,
});

const { elementX, elementY } = useMouseInElement(area);

const { data: posts } = await useAsyncData("blog-posts", async () => {
  const all = await queryCollection("blog")
    .select("title", "path", "description", "summary", "date", "tags", "draft")
    .order("path", "DESC")
    .all();

  if (import.meta.dev) {
    return all;
  }

  return all.filter(post => !post.draft);
});

const activeTag = computed(() =>
  mounted.value && typeof route.query.tag === "string" ? route.query.tag : null);

const timelineItems = computed<TimelineItem[]>(() => {
  const tag = activeTag.value;
  const items: TimelineItem[] = [];
  let currentYear = "";

  for (const post of posts.value ?? []) {
    if (tag && !post.tags?.includes(tag)) continue;

    const year = post.path.split("/")[2] ?? "";

    if (year !== currentYear) {
      currentYear = year;
      items.push({
        slot: "year",
        title: year,
        ui: { indicator: IndexStyle.year.indicator },
      });
    }

    items.push({
      slot: "post",
      title: post.title,
      description: post.summary ?? post.description,
      date: post.date ? format(parseISO(post.date), "MMM d") : undefined,
      to: post.path,
      tags: post.tags ?? [],
      ui: { indicator: IndexStyle.post.indicator },
    });
  }

  return items;
});

const followerStyle = computed(() => ({
  "--follower-x": `${followerBox.value.x}px`,
  "--follower-y": `${followerBox.value.y}px`,
  "--follower-w": `${followerBox.value.width}px`,
  "--follower-h": `${followerBox.value.height}px`,
}));

function onPointerOver(event: PointerEvent) {
  if (event.pointerType !== "mouse" || !listDone.value) return;

  hoveredRow.value = (event.target as HTMLElement).closest<HTMLElement>("[data-post-row]");
}

function onListTransitionEnd(event: TransitionEvent) {
  if (event.propertyName !== "opacity") return;
  if (!(event.target as Element).matches(".stagger-in:last-child")) return;

  listDone.value = true;
}

function cursorBox(): FollowerBox {
  const half = FollowerDot / 2;

  return {
    x: elementX.value - half,
    y: elementY.value - half,
    width: FollowerDot,
    height: FollowerDot,
  };
}

function rowBox(row: HTMLElement): FollowerBox {
  const bounds = area.value?.getBoundingClientRect();
  const rect = row.getBoundingClientRect();

  return {
    x: rect.left - (bounds?.left ?? 0),
    y: rect.top - (bounds?.top ?? 0),
    width: rect.width,
    height: rect.height,
  };
}

watch(hoveredRow, async (row, previousRow) => {
  if (!row) {
    followerBox.value = cursorBox();
    return;
  }

  if (!previousRow) {
    followerSnapping.value = true;
    followerBox.value = cursorBox();

    await nextTick();
    follower.value?.getBoundingClientRect();
    followerSnapping.value = false;

    if (hoveredRow.value !== row) return;
  }

  followerBox.value = rowBox(row);
});

useSeoMeta({
  title: "Blog",
  description: "Writing on Vue, Nuxt, tooling, and whatever I am building.",
});

useAnimate(`.${BlogItem}`, {
  opacity: [0, 1],
  y: ["1.25rem", 0],
  duration: 450,
  ease: "outQuad",
  delay: stagger(60),
  onComplete: () => {
    headerDone.value = true;
  },
});
</script>

<template>
  <UContainer class="py-12 md:py-20">
    <header :class="IndexStyle.header">
      <p :class="IndexStyle.eyebrow">
        Blog
      </p>

      <h1 :class="IndexStyle.title">
        Notes from the workbench
      </h1>

      <p :class="IndexStyle.intro">
        Writing on Vue, Nuxt, tooling, and whatever I am building.
      </p>
    </header>

    <p
      v-if="activeTag"
      :class="IndexStyle.filter.root"
    >
      Posts tagged <span :class="IndexStyle.filter.tag">{{ activeTag }}</span> ·
      <NuxtLink
        :to="{ query: {} }"
        :class="IndexStyle.filter.clear"
      >
        Show all
      </NuxtLink>
    </p>

    <div
      v-if="timelineItems.length"
      ref="area"
      :class="[IndexStyle.area, !headerDone && IndexStyle.areaPending]"
      @pointerover="onPointerOver"
      @transitionend="onListTransitionEnd"
      @pointerleave="hoveredRow = null"
    >
      <span
        ref="follower"
        aria-hidden="true"
        :class="[
          IndexStyle.follower.base,
          followerSnapping && IndexStyle.follower.snapping,
          hoveredRow && !followerSnapping ? IndexStyle.follower.visible : IndexStyle.follower.hidden,
        ]"
        :style="followerStyle"
      />

      <UTimeline
        :items="timelineItems"
        size="3xs"
        :ui="IndexStyle.timeline"
      >
        <template #year-wrapper="{ item }">
          <h2 :class="IndexStyle.year.label">
            {{ item.title }}
          </h2>
        </template>

        <template #post-wrapper="{ item }">
          <div
            data-post-row
            :class="IndexStyle.post.row"
          >
            <p
              v-if="item.date || item.tags.length"
              :class="IndexStyle.post.meta"
            >
              {{ item.date }}<template v-if="item.date && item.tags.length">
                ·
              </template>
              <template
                v-for="(tag, index) in item.tags"
                :key="tag"
              >
                <NuxtLink
                  :to="{ query: { tag } }"
                  :class="IndexStyle.post.tag"
                >{{ tag }}</NuxtLink>{{ index < item.tags.length - 1 ? ", " : "" }}
              </template>
            </p>

            <h3 :class="IndexStyle.post.title">
              <NuxtLink
                :to="item.to"
                :class="IndexStyle.post.titleLink"
              >
                {{ item.title }}
              </NuxtLink>
            </h3>

            <p
              v-if="item.description"
              :class="IndexStyle.post.description"
            >
              {{ item.description }}
            </p>
          </div>
        </template>
      </UTimeline>
    </div>

    <p
      v-else
      :class="IndexStyle.empty"
    >
      Nothing published yet. Check back soon.
    </p>
  </UContainer>
</template>
