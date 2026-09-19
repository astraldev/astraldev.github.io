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

type YearItem = TimelineItem & { slot: "year" };
type PostItem = TimelineItem & { slot: "post", to: string, tags: string[] };

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
    root: "mt-14 -mb-8 text-sm subtitle-colors",
    tag: "font-semibold text-primary",
    clear: "text-primary decoration-wavy underline-offset-4 hover:underline",
  },
  timeline: {
    root: "mt-14 max-w-2xl",
    item: "gap-4 stagger-in",
    container: "w-4 gap-2",
    separator: "w-px bg-primary/20",
    wrapper: "-mt-0.5 pb-0",
  },
  year: {
    indicator: "size-4 bg-primary",
    label: "pb-3 font-mono text-lg/4 font-semibold title-colors",
  },
  post: {
    indicator: "mt-2.5 size-3 bg-transparent ring-2 ring-inset ring-primary/60",
    row: "relative -mt-1 mb-8 px-4 py-3",
    meta: "mb-1 text-sm subtitle-colors",
    title: "text-xl font-semibold text-pretty title-colors",
    titleLink: "transition-colors after:absolute after:inset-0 hover:text-primary"
      + " focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:ring-1 focus-visible:after:ring-primary/40",
    description: "mt-2 subtitle-colors",
    tags: "relative z-10 mt-3 flex w-fit flex-wrap gap-2",
    tagLink: "rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    tag: "transition-colors hover:text-primary",
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
    .order("date", "DESC")
    .order("path", "DESC")
    .all();

  if (import.meta.dev) {
    return all;
  }

  return all.filter(post => !post.draft);
});

const activeTag = computed(() =>
  mounted.value && typeof route.query.tag === "string" ? route.query.tag : null);

const timelineItems = computed<(YearItem | PostItem)[]>(() => {
  const tag = activeTag.value;
  const items: (YearItem | PostItem)[] = [];
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
              v-if="item.date"
              :class="IndexStyle.post.meta"
            >
              {{ item.date }}
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

            <ul
              v-if="item.tags.length"
              :class="IndexStyle.post.tags"
            >
              <li
                v-for="tag in item.tags"
                :key="tag"
              >
                <NuxtLink
                  :to="{ query: { tag } }"
                  :class="IndexStyle.post.tagLink"
                >
                  <UBadge
                    :label="tag"
                    :color="tag === activeTag ? 'primary' : 'neutral'"
                    variant="subtle"
                    :class="IndexStyle.post.tag"
                  />
                </NuxtLink>
              </li>
            </ul>
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
