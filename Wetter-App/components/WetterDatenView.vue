<script lang="ts" setup>

const latitude = ref(0);
const longitude = ref(0);
const wetterData = ref<any>(null);
const error = ref<string | null>(null);

function fetchWeather(lat: number, lon: number) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      wetterData.value = data;
    })
    .catch((err) => {
      error.value = "Fehler beim Laden der Wetterdaten: " + err.message;
    });
}

function handlePosition(position: GeolocationPosition) {
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
  fetchWeather(latitude.value, longitude.value);
}

function handleError(err: GeolocationPositionError) {
  error.value = "Standort konnte nicht ermittelt werden.";
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition, handleError);
  } else {
    error.value = "Geolocation wird von diesem Browser nicht unterstützt.";
  }
});
</script>


<template>
    <div class="flex justify-center items-center text-center h-32">
      <span v-if="error">{{ error }}</span>
      <span v-else-if="!wetterData">Lade Wetterdaten...</span>
      <span v-else>
        Temperatur: {{ wetterData.current_weather.temperature }} °C<br>
        Windgeschwindigkeit: {{ wetterData.current_weather.windspeed }} km/h
      </span>
    </div>
  </template>

<style scoped>
    
</style>