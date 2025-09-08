// avatars.js - Módulo centralizado de avatares para Lotería Mexicana

window.avatares = [
  { id: 1, icono: "fas fa-cloud-sun-rain", nombre: "Tláloc", color: "#2196F3" },
  { id: 2, icono: "fas fa-mountain", nombre: "Xinantécatl", color: "#795548" },
  { id: 3, icono: "fas fa-leaf", nombre: "Yum Kaax", color: "#388E3C" },
  { id: 4, icono: "fas fa-water", nombre: "Tlanchana", color: "#4DD0E1" },
  { id: 5, icono: "fas fa-feather-alt", nombre: "Quetzalcóatl", color: "#4CAF50" },
  { id: 6, icono: "fas fa-meteor", nombre: "Huitzilopochtli", color: "#D32F2F" },
  { id: 7, icono: "fas fa-drumstick-bite", nombre: "Xiló", color: "#FFEB3B" },
  { id: 8, icono: "fas fa-fire", nombre: "Chantico", color: "#FF5722" },
  { id: 9, icono: "fas fa-skull", nombre: "Mictlantecuhtli", color: "#9E9E9E" },
  { id: 10, icono: "fas fa-ankh", nombre: "Coatlicue", color: "#A1887F" },
  { id: 11, icono: "fas fa-crow", nombre: "Tecuanis", color: "#263238" },
  { id: 12, icono: "fas fa-sun", nombre: "Tonatiuh", color: "#FFD700" },
  { id: 13, icono: "fas fa-tree", nombre: "Ceiba", color: "#558B2F" },
  { id: 14, icono: "fas fa-snowflake", nombre: "Iztlaciuatl", color: "#B0BEC5" },
  { id: 15, icono: "fas fa-hand-holding-heart", nombre: "Cihuateteo", color: "#AD1457" },
  { id: 16, icono: "fas fa-map-marked-alt", nombre: "Teotihuacan", color: "#FFC107" }
];

// Función utilitaria para obtener avatar por id (devuelve objeto avatar)
window.getAvatarById = function(id) {
  return window.avatares[parseInt(id)-1] || window.avatares[0];
};
