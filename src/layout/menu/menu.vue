<template>
  <div class="menu-container" :style="{ height: isSideMenu ? 'calc(100vh - 64px)' : '' }">
    <Menu
      v-model:selected-keys="state.selectedKeys"
      :open-keys="isSideMenu ? state.openKeys : []"
      :mode="isSideMenu ? 'inline' : 'horizontal'"
      :theme="theme"
      :collapsed="props.collapsed"
      collapsible
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.name || item.fullPath">
        <MenuItem :menu-info="item" />
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, watch, type PropType } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Menu, type MenuTheme } from 'ant-design-vue';
  import MenuItem from './menu-item.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useThemeStore } from '@/store/modules/projectConfig';
  import { LOGIN_NAME } from '@/router/constant';

  const props = defineProps({
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    theme: {
      type: String as PropType<MenuTheme>,
    },
  });
  const userStore = useUserStore();
  const themeStore = useThemeStore();
  // 当前路由
  const currentRoute = useRoute();
  const router = useRouter();
  const state = reactive({
    openKeys: [] as string[],
    selectedKeys: [currentRoute.name] as string[],
  });

  const menus = computed(() => {
    return [...userStore.menus]
      .filter((n) => !n.meta?.hideInMenu)
      .sort((a, b) => (a?.meta?.orderNum || 0) - (b?.meta?.orderNum || 0));
  });
  /** 侧边栏布局 */
  const isSideMenu = computed(() => themeStore.layout === 'sidemenu');
  // 根据activeMenu获取指定的menu
  const getTargetMenuByActiveMenuName = (activeMenu: string) => {
    return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu));
  };

  // 获取当前打开的子菜单
  const getOpenKeys = () => {
    const meta = currentRoute.meta;
    if (meta?.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
      return targetMenu?.meta?.namePath ?? [meta?.activeMenu];
    }

    return (
      meta?.hideInMenu
        ? state?.openKeys || []
        : currentRoute.meta?.namePath ?? currentRoute.matched.slice(1).map((n) => n.name)
    ) as string[];
  };

  // 监听菜单收缩状态
  watch(
    () => props.collapsed,
    (newVal) => {
      state.openKeys = newVal ? [] : getOpenKeys();
      state.selectedKeys = [currentRoute.name] as string[];
    },
  );

  // 跟随页面路由变化，切换菜单选中状态
  watch(
    () => currentRoute.fullPath,
    () => {
      if (currentRoute.name === LOGIN_NAME || props.collapsed) return;
      state.openKeys = getOpenKeys();
      const meta = currentRoute.meta;
      if (meta?.activeMenu) {
        const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
        state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu] as string[];
      } else {
        state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name] as string[];
      }
    },
    {
      immediate: true,
    },
  );

  // 点击菜单
  const clickMenuItem = ({ key }) => {
    if (key === currentRoute.name) return;
    if (/http(s)?:/.test(key)) {
      window.open(key);
    } else {
      router.push({ name: key });
    }
  };
</script>

<style lang="less" scoped>
  .menu-container {
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  :deep(.ant-menu) {
    font-size: 20px;
    background: @primary-color;
    color: @body-background;

    .ant-menu-submenu-arrow {
      color: @body-background;
    }

    .ant-menu-item-selected {
      background: inherit;
      color: inherit;
    }

    .ant-menu-submenu-active {
      .ant-menu-title-content,
      .ant-menu-submenu-arrow {
        color: @body-background;
      }
    }

    .ant-menu-submenu-open > .ant-menu-submenu-title {
      background: rgba(255, 255, 255, 1);
      color: @primary-color !important;

      .ant-menu-title-content,
      .ant-menu-submenu-arrow {
        background: rgba(255, 255, 255, 1);
        color: @primary-color !important;
      }
    }

    .ant-menu-submenu-selected {
      background: @primary-color;
      color: @body-background;

      .ant-menu-submenu-title,
      .ant-menu-submenu-arrow {
        color: @body-background;
      }
    }

    .ant-menu-item:hover {
      color: @body-background;
    }

    .ant-menu-item,
    .ant-menu-submenu-title {
      padding-left: 24px !important;
    }
  }
</style>
