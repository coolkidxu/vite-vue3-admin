<template>
  <a-card>
    <section class="button-container">
      <a-button type="primary">添加</a-button>
      <a-button>启用</a-button>
      <a-button>停用</a-button>
    </section>
    <section>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="2" class="tab-title" tab="串口" force-render>
          <span class="tab-title">
            <a-table
              :row-selection="{ onChange: onSelectChange }"
              :data-source="dataSource"
              :columns="columns"
            />
          </span>
        </a-tab-pane>
        <a-tab-pane key="3" class="tab-title" tab="模拟量">
          <span class="tab-title">模拟量</span>
        </a-tab-pane>
      </a-tabs>
    </section>
  </a-card>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { getInterface } from '@/api/device';

  const activeKey = ref('2');

  const dataSource = [
    {
      key: '1',
      name: '串口号',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '串口号',
      dataIndex: 'CComPort',
      key: 'CComPort',
    },
    {
      title: '波特率',
      dataIndex: 'CBaurate',
      key: 'CBaurate',
    },
    {
      title: '奇偶校验',
      dataIndex: 'CParity',
      key: 'CParity',
    },
    {
      title: '数据位',
      dataIndex: 'CDatabit',
      key: 'CDatabit',
    },
    {
      title: '停止位',
      dataIndex: 'CStop',
      key: 'CStop',
    },
    {
      title: '串口使能',
      dataIndex: 'CCloseFlag',
      key: 'CCloseFlag',
    },
    {
      title: '是否调试',
      dataIndex: 'IsDebug',
      key: 'IsDebug',
    },
    {
      title: '编辑',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const state = reactive<{ selectedRowKeys: Key[]; loading: boolean }>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });
  const loadInterface = async () => {
    await getInterface();
  };

  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
  };
  loadInterface();
</script>

<style lang="less" scoped>
  .button-container {
    display: flex;
    align-items: center;
    gap: 2em;
    justify-content: start;
  }

  :deep(.ant-table) {
    .ant-checkbox-checked .ant-checkbox-inner,
    .ant-checkbox-indeterminate .ant-checkbox-inner::after {
      background-color: @primary-color;
      border-color: @primary-color;
    }

    .ant-checkbox-indeterminate .ant-checkbox-inner {
      border-color: @primary-color;
    }

    .ant-table-row-selected > .ant-table-cell {
      color: @primary-color;
      background: rgba(30, 90, 191, 0.05);
    }
  }
</style>
