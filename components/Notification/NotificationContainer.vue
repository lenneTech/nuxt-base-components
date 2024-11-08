<script lang="ts" setup>
const {notifications, remove} = useNotification();
</script>

<template>
  <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-[99999]"
  >
    <TransitionGroup class="flex w-full flex-col items-center space-y-4 sm:items-end" name="list" tag="div">
      <Notification
          v-for="notification in notifications"
          :key="notification.uuid"
          :duration="notification.duration!"
          :text="notification.text"
          :title="notification.title"
          :type="notification.type"
          @close="remove(notification.uuid)"
      />
    </TransitionGroup>
  </div>
</template>

<style>
.list-move,
  /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
