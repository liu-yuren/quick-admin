# git提交 443连接超时

### 设置代码

git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897

### 清除代理

git config --global --unset http.proxy
git config --global --unset https.proxy

# 性能优化

# 动态表单

# 动态表格

# echarts 3D图形

1. 3D柱状图
2. 3D饼图
3. 3D折线图

# GitLab CiCd

# 权限设计

基于角色的访问控制（RBAC）

1. 定义角色：根据用户职责定义不同角色，如管理员、编辑者、查看者等。
2. 分配权限：为每个角色分配相应的权限，如创建、编辑、删除等操作权限。
3. 用户角色管理：将用户分配到相应的角色，实现权限控制。

### 技术实现方案

1. 页面/路由权限

- 动态路由：根据用户角色从后端获取可访问的路由配置，通过 addRoutes 动态注册。
- 路由守卫：使用全局路由守卫（如 beforeEach）检查用户权限，未授权则重定向到登录页面或权限不足页面。

2. 按钮权限

- v-if：在页面中使用 v-if 指令控制按钮是否显示。
- 指令控制：封装 v-permission 指令，自动隐藏无权限的按钮。
