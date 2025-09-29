const fs = require('fs');
const path = require('path');

console.log('🔄 Updating JSON fields for SQLite compatibility...');

try {
  const scriptPath = path.join(__dirname, 'init-property-db.js');
  let content = fs.readFileSync(scriptPath, 'utf8');
  
  // Update all array fields to JSON.stringify
  const replacements = [
    // Features
    { from: /features: \[([^\]]+)\]/g, to: 'features: JSON.stringify([$1])' },
    // Amenities  
    { from: /amenities: \[([^\]]+)\]/g, to: 'amenities: JSON.stringify([$1])' },
    // Images
    { from: /images: \[([^\]]+)\]/g, to: 'images: JSON.stringify([$1])' },
    // Languages
    { from: /languages: \[([^\]]+)\]/g, to: 'languages: JSON.stringify([$1])' },
    // Specialties
    { from: /specialties: \[([^\]]+)\]/g, to: 'specialties: JSON.stringify([$1])' },
    // Property Types
    { from: /propertyTypes: \[([^\]]+)\]/g, to: 'propertyTypes: JSON.stringify([$1])' }
  ];
  
  replacements.forEach(({ from, to }) => {
    content = content.replace(from, to);
  });
  
  // Write updated content
  fs.writeFileSync(scriptPath, content);
  console.log('✅ Updated all array fields to JSON.stringify');
  
  console.log('\n📋 Updated fields:');
  console.log('- features: String[] → JSON.stringify()');
  console.log('- amenities: String[] → JSON.stringify()');
  console.log('- images: String[] → JSON.stringify()');
  console.log('- languages: String[] → JSON.stringify()');
  console.log('- specialties: String[] → JSON.stringify()');
  console.log('- propertyTypes: PropertyType[] → JSON.stringify()');
  
} catch (error) {
  console.error('❌ Error updating JSON fields:', error);
  process.exit(1);
}
