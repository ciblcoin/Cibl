const handleCreateWallet = async () => {
  // ۱. پخش صدای "شروع پروتکل امنیتی"
  SoundManager.play('AUTH');
  
  // ۲. شروع انیمیشن لودینگ درخشان
  setIsGenerating(true);
  
  try {
    const mnemonic = await KeyManager.createAndSaveWallet();
    
    // ۳. نمایش NeonToast موفقیت
    showToast('SECURED', 'Vault created with military-grade encryption', 'success');
    
    // رفتن به صفحه نمایش ۱۲ کلمه (که قبلاً ساختیم)
    navigation.navigate('BackupSeed', { mnemonic });
  } catch (error) {
    showToast('ERROR', 'Failed to initialize vault', 'danger');
  } finally {
    setIsGenerating(false);
  }
};
