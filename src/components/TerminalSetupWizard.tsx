import React, { useState, useMemo } from 'react';
import { Instruction } from '../types';
import { Monitor, CheckCircle, ArrowLeft, RotateCw, Edit3, Save, X, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface TerminalSetupWizardProps {
  instructions: Instruction[];
  onAddInstruction: (data: { title: string; content: string; category: string }) => Promise<void>;
  onUpdateInstruction: (id: string, data: { title: string; content: string; category: string }) => Promise<void>;
}

export default function TerminalSetupWizard({
  instructions,
  onAddInstruction,
  onUpdateInstruction,
}: TerminalSetupWizardProps) {
  // Filter steps by category 'Шаги Настройки'
  const stepInstructions = useMemo(() => {
    const list = instructions.filter((i) => i.category === 'Шаги Настройки');
    // Sort steps based on Title or creation to preserve order
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }, [instructions]);

  // Default hardcoded beautiful steps if database is empty
  const defaultSteps = [
    {
      id: 'default-step-1',
      title: 'Шаг 1. Первичный сброс настроек ТСД',
      content: '### Шаг 1: Полный сброс параметров (Factory Reset)\n\n1. Полностью выключите ТСД.\n2. Зажмите физическую клавишу **Включение** совместно с **Левой желтой боковой клавишей** на 5 секунд.\n3. Как только на экране загорится логотип вендора (Zebra/Honeywell), отпустите кнопку включения, при этом удерживайте нажатой боковую клавишу.\n4. В появившемся сервисном меню Recovery выберите пункт меню **Wipe data / factory reset** при помощи качелей громкости.\n5. Подтвердите операцию нажатием на кнопку **Сканирования**.\n6. По завершении очистки выберите **Reboot system now** для запуска чистой ОС Android.\n\n*Нажмите кнопку «Редактировать» внизу вкладки, чтобы добавить свои примечания!*',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-2',
      title: 'Шаг 2. Подключение к скрытой Wi-Fi сети',
      content: '### Шаг 2: Настройка безопасного Wi-Fi соединения\n\n1. После загрузки ТСД перейдите в **Режим настроек Android (Settings)**.\n2. Откройте раздел **Сеть и интернет** -> **Wi-Fi**.\n3. Включите беспроводной адаптер, если он был выключен.\n4. Нажмите **Добавить сеть** и введите SSID скрытой складской Wi-Fi сети (например: *Fozzy_Secure_Wi-Fi*).\n5. Установите тип защиты в положение **WPA/WPA2-Enterprise**.\n6. Укажите персональный Логин ТСД и Пароль авторизации сети.\n7. Нажмите кнопку **Подключить** и убедитесь, что присвоен IP-адрес подсети РЦ (например: *10.128.x.x*).\n\n*Вы можете отредактировать этот текст по своему усмотрению в любое время.*',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-3',
      title: 'Шаг 3. Синхронизация системного времени',
      content: '### Шаг 3: Настройка даты, времени и часового пояса\n\n1. Перейдите в раздел управления системой Android: **Система** -> **Дата и время**.\n2. Включите опции **Использовать время сети** и **Использовать часовой пояс сети**.\n3. В качестве резервного сервера времени (NTP) введите адрес локального контроллера домена: **ntp.rc.local**.\n4. Убедитесь, что часовой пояс установлен на **Москва (GMT+3)** или ваш локальный регион.\n5. Верное время критично для корректной записи логов работы в JSON-базу данных!',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-4',
      title: 'Шаг 4. Настройка лазера (DataWedge)',
      content: '### Шаг 4: Калибровка лазера и DataWedge\n\n1. Запустите системное приложение и утилиту **DataWedge** (или **ScanWedge** на Honeywell).\n2. Выберите базовый профиль **Profile0 (default)**.\n3. Перейдите в раздел **Barcode Input** -> **Decoders** и включите поддержку штрихкодов EAN-13, Code 128, DataMatrix.\n4. В разделе **Keystroke Output** активируйте опцию **Enabled**.\n5. Добавьте автоматический суффикс перевода строки (Enter/Carriage Return) в подразделе **Basic data formatting** -> **Send ENTER key**.',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-5',
      title: 'Шаг 5. Скачивание и установка APK',
      content: '### Шаг 5: Установка фирменного ПО терминала\n\n1. Подключите ТСД к ПК через USB-кабель или откройте встроенный веб-браузер на самом терминале.\n2. Перейдите по внутренней ссылке: **http://distrib.rc.local/tsd/latest.apk**.\n3. Скачайте файл установщика последней версии приложения.\n4. Откройте скачанный файл и в появившемся окне безопасности разрешите установку приложений из внешних источников для браузера.\n5. Нажмите кнопку **Установить** и дождитесь завершения операции установки.',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-6',
      title: 'Шаг 6. Назначение системных разрешений',
      content: '### Шаг 6: Конфигурация системных доступов\n\n1. Запустите установленное приложение **Перемога ТСД**.\n2. При запросе разрешений предоставьте приложению полный доступ к **Камере** (для резервного сканирования товаров).\n3. Предоставьте доступ к **Файловой системе** (хранилищу) для сохранения временных буферов накладных.\n4. Нажмите "Разрешить" в пункте настроек "Отображение поверх других окон" для корректной работы всплывающих уведомлений.',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-7',
      title: 'Шаг 7. Конфигурация связи с сервером',
      content: '### Шаг 7: Конфигурация точки обмена данными\n\n1. В приложении ТСД перейдите в инженерный раздел настроек связи (иконка шестеренки в верхнем углу).\n2. Укажите IP-адрес центрального сервера сборщика: **192.168.10.45** или доменное имя **api.rc-peremoha.local**.\n3. Установите сетевой порт обмена: **3000**.\n4. Нажмите кнопку **Подтвердить изменения** для сохранения параметров во внутреннюю память устройства.',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-8',
      title: 'Шаг 8. Тестовый пинг и проверка связи',
      content: '### Шаг 8: Контрольное испытание сетевой связности\n\n1. В меню настроек связи ТСД нажмите кнопку **Проверить соединение**.\n2. На экране должен появиться зеленый индикатор статуса и лог: *Connection successful, DB synchronized.*\n3. Сделайте один тестовый скан любого штрихкода товара на упаковочной зоне склада.\n4. Проверьте, что в общей панели синхронизации ТСД отобразился статус привязанного устройства.',
      category: 'Шаги Настройки'
    },
    {
      id: 'default-step-9',
      title: 'Шаг 9. Нанесение инвентарного штрихкода',
      content: '### Шаг 9: Маркировка и финальная сверка\n\n1. Распечатайте на принтере этикеток штрихкод инвентарного номера ТСД.\n2. Наклейте липкую этикетку на заднюю крышку ТСД под аккумуляторный отсек или на боковой бампер.\n3. Проверьте прочность фиксации ремешка и стилуса устройства.\n4. Передайте готовое изделие в зону выдачи сотрудникам склада.\n5. Поставьте ТСД на зарядную станцию до полной зарядки батареи (100%).',
      category: 'Шаги Настройки'
    }
  ];

  // Resolve steps (either loaded from DB, matching category 'Шаги Настройки', or default steps)
  const finalSteps = stepInstructions.length >= 9 ? stepInstructions : defaultSteps;

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = finalSteps[activeStepIdx] || finalSteps[0];

  // Initiate edit mode
  const handleStartEdit = () => {
    setEditTitle(currentStep.title);
    setEditContent(currentStep.content);
    setIsEditing(true);
    setSaveStatus('');
  };

  // Save changes to backend
  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      setSaveStatus('Заполните все текстовые поля');
      return;
    }

    try {
      setSaveStatus('Сохранение...');
      
      const stepToPersist = stepInstructions.find(s => s.title === currentStep.title) || 
                            instructions.find(i => i.title === currentStep.title);

      if (stepToPersist) {
        // Update database
        await onUpdateInstruction(stepToPersist.id, {
          title: editTitle.trim(),
          content: editContent.trim(),
          category: 'Шаги Настройки'
        });
      } else {
        // Create new
        await onAddInstruction({
          title: editTitle.trim(),
          content: editContent.trim(),
          category: 'Шаги Настройки'
        });
      }

      setIsEditing(false);
      setSaveStatus('Успешно сохранено на сервере!');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch (err: any) {
      setSaveStatus('Ошибка: ' + (err.message || 'не удалось записать'));
    }
  };

  const handleNext = () => {
    if (activeStepIdx < finalSteps.length - 1) {
      setActiveStepIdx(prev => prev + 1);
      setIsEditing(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx(prev => prev - 1);
      setIsEditing(false);
    }
  };

  const handleRestart = () => {
    setActiveStepIdx(0);
    setIsCompleted(false);
    setIsEditing(false);
  };

  // Convert step to proper layout
  const renderFormattedBody = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('###')) {
        return <h4 key={idx} className="text-sm font-extrabold text-white mt-4 mb-2">{trimmed.replace('###', '')}</h4>;
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="ml-5 list-disc text-slate-350 text-xs py-0.5 leading-relaxed font-semibold">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (/^\d+\./.test(trimmed)) {
        return (
          <li key={idx} className="ml-5 list-decimal text-slate-350 text-xs py-1.5 leading-relaxed font-semibold">
            {trimmed.substring(trimmed.indexOf('.') + 1).trim()}
          </li>
        );
      }
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-xs text-slate-400 leading-relaxed py-0.5 font-medium">{trimmed}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-900/60 p-6 rounded-3xl border border-slate-800/90 shadow-2xl space-y-6 animate-fade-in">
      
      {/* Wizard upper Header */}
      <div className="flex border-b border-slate-800/80 pb-4 justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-white uppercase tracking-wide">
              Настройка нового терминала (Интерактивный Помощник)
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">Последовательный конфигуратор ТСД перед выдачей в работу.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-1 bg-slate-950/40 border border-slate-800 text-xs font-bold text-slate-400 px-3.5 py-1.5 rounded-xl">
          <span>Шагов всего: </span>
          <span className="text-blue-400 text-xs font-black">{finalSteps.length}</span>
        </div>
      </div>

      {isCompleted ? (
        /* Completion Beautiful Screen */
        <div className="text-center p-12 bg-slate-950/20 border border-slate-800/60 rounded-2xl flex flex-col items-center justify-center space-y-5 animate-fade-in">
          <div className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full animate-bounce">
            <CheckCircle className="w-12 h-12" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-black text-white">ТСД успешно настроен и готов!</h3>
            <p className="text-xs text-slate-400 max-w-lg mx-auto font-medium lead-normal">
              Вы успешно прошли все шаги пошаговой калибровки, сброса и настройки ПО. Теперь устройство можно передавать сотруднику склада в кабинете или разместить статус «На складе».
            </p>
          </div>
          
          <div className="flex justify-center space-x-3 pt-3">
            <button
              onClick={handleRestart}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Начать Сначала</span>
            </button>
          </div>
        </div>
      ) : (
        /* Setup stepper & view content steps */
        <div className="space-y-6">
          
          {/* STEP TABS COMPONENT: Each step in a responsive tab */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {finalSteps.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              const isPast = idx < activeStepIdx;
              return (
                <button
                  key={step.id || idx}
                  onClick={() => {
                    setActiveStepIdx(idx);
                    setIsEditing(false);
                    setSaveStatus('');
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20 text-white'
                      : isPast
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300/80 hover:bg-slate-950/50'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : isPast 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold truncate">Шаг {idx + 1}</span>
                  </div>
                  <div className="text-[10px] truncate mt-1 text-slate-400 font-medium hidden sm:block">
                    {step.title.replace(/^Шаг \d+\.\s*/, '')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active step panel content */}
          <div className="bg-slate-950/30 rounded-2xl border border-slate-800/60 p-6 space-y-4">
            
            {/* Title / Description container */}
            {isEditing ? (
              <div className="space-y-3">
                <div className="space-y-0.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Название шага в мастере</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full text-xs font-bold p-2.5 rounded-lg border border-slate-700 bg-slate-850 text-white"
                    placeholder="Например: Шаг 1. Первичная очистка и сброс настроек"
                  />
                </div>
                
                <div className="space-y-0.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Подробный Текст Руководства</label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={10}
                    className="w-full text-xs font-mono p-3 rounded-lg border border-slate-700 bg-slate-850 text-white focus:outline-hidden"
                    placeholder="Введите текст инструкции..."
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-slate-500">Поддерживает списки (строки с 1. или *)</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-755 text-slate-300 rounded-lg text-xs font-bold"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4.5 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-xs font-bold flex items-center space-x-1"
                    >
                      <Save className="w-3.5 h-3.5 mr-1" />
                      Сохранить Шаг
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                  <span className="text-xs font-black uppercase text-blue-400 tracking-wider flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5 text-blue-400 animate-pulse" />
                    {currentStep.title}
                  </span>
                  <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">ИНСТРУКЦИЯ С ТЕХПОДДЕРЖКИ</span>
                </div>

                <div className="min-h-[140px] space-y-1 fallback-text">
                  {renderFormattedBody(currentStep.content)}
                </div>

                <div className="pt-4 border-t border-slate-800/40 flex items-center justify-between">
                  <button
                    onClick={handleStartEdit}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-xs font-bold hover:bg-slate-800 transition flex items-center cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1 text-blue-400" />
                    Редактировать Шаг
                  </button>

                  {saveStatus && (
                    <span className="text-xs font-bold text-blue-300 bg-slate-800 px-2 py-1 rounded animate-pulse">{saveStatus}</span>
                  )}
                </div>
              </div>
            )}
            
          </div>

          {/* Navigational controls: назад, заново, готово */}
          <div className="flex items-center justify-between pt-2">
            {/* Left: Назад */}
            <button
              onClick={handleBack}
              disabled={activeStepIdx === 0}
              className="px-5 py-2.5 bg-slate-900 border border-slate-800/90 text-slate-300 disabled:opacity-40 hover:bg-slate-800/80 hover:text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>

            {/* Middle: Заново */}
            <button
              onClick={handleRestart}
              className="px-4.5 py-2.5 bg-slate-950/30 text-slate-400 hover:text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition flex items-center space-x-1 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 mr-1" />
              <span>Заново</span>
            </button>

            {/* Right: Готово / Далее */}
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-blue-600 border border-blue-500/20 text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg shadow-blue-500/10 transition flex items-center space-x-1.5 cursor-pointer"
            >
              <span>{activeStepIdx === finalSteps.length - 1 ? 'Завершить Настройку' : 'Готово (Далее)'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
