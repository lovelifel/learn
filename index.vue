<template>
  <div
    @mousemove="debounce(increment, 1000)"
    style="padding: 20px; border: 1px solid #ccc; margin: 20px 0"
  >
    <div>
      鼠标移动计数:
      <p style="color: red">{{ count }}</p>
    </div>
    <p>在这个区域移动鼠标，计数会增加</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const a1 = [1, 2, 3, 1, 4, 5];
const unique = (array) => {
  var res = array.filter((item, index, array) => {
    console.log(array);
    return array.indexOf(item) === index;
  });

  return res;
};

unique(a1);
</script>


<style scoped> 

div{

border-radius: ;

}
</style>
