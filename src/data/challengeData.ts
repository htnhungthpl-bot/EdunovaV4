import { 
  SentenceBuilderRound, 
  SpellingCase, 
  VividWordChallenge, 
  SentenceSmithLevel,
  ChallengeBadge 
} from '../types/challenges';

// ==================== TRÒ CHƠI 1: XÂY CÂU THẦN TỐC (6 VÒNG) ====================
export const SENTENCE_BUILDER_ROUNDS: SentenceBuilderRound[] = [
  {
    id: 'sb-1',
    roundNumber: 1,
    title: 'Miêu tả mầm non mùa xuân',
    theme: 'Cây cối & Thiên nhiên',
    pieces: [
      'Vào mùa xuân,',
      'những mầm non biếc',
      'nhú lên',
      'như những ngọn nến xanh.'
    ],
    validSentences: [
      'Vào mùa xuân, những mầm non biếc nhú lên như những ngọn nến xanh.',
      'Những mầm non biếc nhú lên như những ngọn nến xanh vào mùa xuân.',
      'Vào mùa xuân những mầm non biếc nhú lên như những ngọn nến xanh'
    ],
    hint: 'Em hãy đặt trạng ngữ chỉ thời gian "Vào mùa xuân," ở đầu câu, tiếp theo là chủ ngữ chỉ sự vật, hành động rồi đến hình ảnh so sánh nhé!',
    explanation: 'Câu văn hoàn chỉnh và rất sinh động: Có trạng ngữ thời gian mở đầu ("Vào mùa xuân,"), chủ ngữ "những mầm non biếc" và vị ngữ giàu hình ảnh so sánh "nhú lên như những ngọn nến xanh".',
    grammaticalTip: 'Cấu trúc câu: Trạng ngữ thời gian + Chủ ngữ + Vị ngữ (có so sánh).'
  },
  {
    id: 'sb-2',
    roundNumber: 2,
    title: 'Miêu tả chú mèo sưởi nắng',
    theme: 'Con vật quen thuộc',
    pieces: [
      'Chú mèo mướp',
      'nằm cuộn tròn',
      'sưởi nắng',
      'bên hiên nhà ấm áp.'
    ],
    validSentences: [
      'Chú mèo mướp nằm cuộn tròn sưởi nắng bên hiên nhà ấm áp.',
      'Bên hiên nhà ấm áp, chú mèo mướp nằm cuộn tròn sưởi nắng.'
    ],
    hint: 'Chủ ngữ thực hiện hành động là ai nhỉ? Đúng rồi, là "Chú mèo mướp". Sau đó hãy ghép dáng điệu nằm, hành động sưởi nắng và địa điểm nhé!',
    explanation: 'Rất chính xác! Câu văn miêu tả rõ nét chú mèo với dáng điệu lười biếng đáng yêu ("nằm cuộn tròn"), hành động ("sưởi nắng") và không gian ấm áp bên hiên nhà.',
    grammaticalTip: 'Cấu trúc câu: Chủ ngữ + Cụm vị ngữ diễn tả tư thế, hành động và nơi chốn.'
  },
  {
    id: 'sb-3',
    roundNumber: 3,
    title: 'Miêu tả dòng sông quê hương',
    theme: 'Cảnh đẹp quê hương',
    pieces: [
      'Dòng sông quê em',
      'uốn lượn hiền hòa',
      'như một dải lụa mềm',
      'vắt qua cánh đồng.'
    ],
    validSentences: [
      'Dòng sông quê em uốn lượn hiền hòa như một dải lụa mềm vắt qua cánh đồng.',
      'Vắt qua cánh đồng, dòng sông quê em uốn lượn hiền hòa như một dải lụa mềm.'
    ],
    hint: 'Bắt đầu bằng sự vật trung tâm: "Dòng sông quê em", sau đó miêu tả vẻ êm ả và hình ảnh so sánh với dải lụa mềm mại vắt qua đồng ruộng.',
    explanation: 'Tuyệt vời! Đây là một câu văn so sánh mẫu mực của phân môn Luyện từ và câu lớp 4, giúp dòng sông quê hương hiện lên mềm mại và đầy chất thơ.',
    grammaticalTip: 'Nghệ thuật so sánh: Dòng sông (Sự vật 1) uốn lượn + như (Từ so sánh) + một dải lụa mềm (Sự vật 2).'
  },
  {
    id: 'sb-4',
    roundNumber: 4,
    title: 'Khung cảnh giờ ra chơi náo nhiệt',
    theme: 'Mái trường & Bạn bè',
    pieces: [
      'Giờ ra chơi,',
      'sân trường',
      'rộn rã',
      'tiếng cười nói',
      'của các bạn học sinh.'
    ],
    validSentences: [
      'Giờ ra chơi, sân trường rộn rã tiếng cười nói của các bạn học sinh.',
      'Sân trường rộn rã tiếng cười nói của các bạn học sinh trong giờ ra chơi.',
      'Giờ ra chơi sân trường rộn rã tiếng cười nói của các bạn học sinh'
    ],
    hint: 'Đặt mốc thời gian "Giờ ra chơi," ở đầu, tiếp theo là nơi chốn "sân trường" rồi đến âm thanh nhộn nhịp của các bạn học sinh nhé!',
    explanation: 'Rất chuẩn! Trạng ngữ thời gian ở đầu câu giúp tạo bối cảnh, từ láy "rộn rã" làm nổi bật không khí vui tươi, hồn nhiên nơi trường lớp.',
    grammaticalTip: 'Trạng ngữ thời gian + Chủ ngữ (Sân trường) + Vị ngữ miêu tả âm thanh nhộn nhịp.'
  },
  {
    id: 'sb-5',
    roundNumber: 5,
    title: 'Chị gió xuân đánh thức nụ hoa',
    theme: 'Nhân hóa thiên nhiên',
    pieces: [
      'Chị gió xuân',
      'nhẹ nhàng',
      'lay động',
      'từng cánh hoa mai vàng',
      'đang hé nở.'
    ],
    validSentences: [
      'Chị gió xuân nhẹ nhàng lay động từng cánh hoa mai vàng đang hé nở.',
      'Nhẹ nhàng, chị gió xuân lay động từng cánh hoa mai vàng đang hé nở.'
    ],
    hint: 'Chủ ngữ được nhân hóa là "Chị gió xuân", tiếp đến là cách thức "nhẹ nhàng", động từ "lay động" và đối tượng là những cánh hoa mai vàng.',
    explanation: 'Xuất sắc! Biện pháp nhân hóa gọi gió là "Chị" kết hợp động từ "lay động nhẹ nhàng" khiến thiên nhiên mùa xuân trở nên ấm áp và có tâm hồn.',
    grammaticalTip: 'Biện pháp nhân hóa: Gọi sự vật (Gió xuân) bằng từ ngữ chỉ người (Chị) và gán cho hành động âu yếm.'
  },
  {
    id: 'sb-6',
    roundNumber: 6,
    title: 'Tình cảm với trang vở học trò',
    theme: 'Học tập & Rèn luyện',
    pieces: [
      'Em luôn tự hào',
      'và nâng niu',
      'từng trang vở ô ly',
      'sạch đẹp của mình.'
    ],
    validSentences: [
      'Em luôn tự hào và nâng niu từng trang vở ô ly sạch đẹp của mình.',
      'Từng trang vở ô ly sạch đẹp của mình luôn được em tự hào và nâng niu.'
    ],
    hint: 'Bắt đầu bằng cảm xúc của em: "Em luôn tự hào", kết nối thái độ "và nâng niu", rồi đến đồ vật thân yêu là "từng trang vở ô ly sạch đẹp của mình".',
    explanation: 'Câu văn thật đẹp và giàu ý nghĩa! Thể hiện tình cảm trân trọng, ý thức giữ gìn sách vở cẩn thận, đúng tinh thần học sinh lớp 4 chăm ngoan.',
    grammaticalTip: 'Chủ ngữ (Em) + Cụm vị ngữ chỉ cảm xúc và hành vi nâng niu đồ dùng học tập.'
  }
];

// ==================== TRÒ CHƠI 2: THÁM TỬ CHÍNH TẢ (8 VỤ ÁN) ====================
export const SPELLING_CASES: SpellingCase[] = [
  {
    id: 'sp-1',
    caseNumber: 1,
    title: 'Vụ án: Giọt sương mai trên búp lá',
    topic: 'l/n',
    passage: 'Sáng sớm mùa thu, những giọt sương đọng trên phiến lá non nung ninh như những viên ngọc bích tí hon.',
    wrongWord: 'nung ninh',
    correctWord: 'lung linh',
    options: [
      { id: 'opt-1-1', word: 'lung linh', isCorrect: true },
      { id: 'opt-1-2', word: 'nung ninh', isCorrect: false },
      { id: 'opt-1-3', word: 'nung linh', isCorrect: false },
      { id: 'opt-1-4', word: 'lung ninh', isCorrect: false }
    ],
    explanation: 'Từ đúng phải là "lung linh" (viết bằng chữ l). "Lung linh" là từ láy gợi tả ánh sáng phản chiếu lấp lánh, rung rinh mềm mại.',
    spellingRule: 'Mẹo nhớ: Các từ láy gợi ánh sáng trong tiếng Việt thường bắt đầu bằng chữ L: lung linh, lấp lánh, lóng lánh, le lói.'
  },
  {
    id: 'sp-2',
    caseNumber: 2,
    title: 'Vụ án: Bác bàng già nơi góc sân trường',
    topic: 's/x',
    passage: 'Nơi góc sân trường em, cây bàng cổ thụ xừng xững tỏa bóng râm mát rượi cho chúng em vui chơi.',
    wrongWord: 'xừng xững',
    correctWord: 'sừng sững',
    options: [
      { id: 'opt-2-1', word: 'sừng sững', isCorrect: true },
      { id: 'opt-2-2', word: 'xừng xững', isCorrect: false },
      { id: 'opt-2-3', word: 'sừng xững', isCorrect: false },
      { id: 'opt-2-4', word: 'xừng sững', isCorrect: false }
    ],
    explanation: 'Từ đúng là "sừng sững" (bắt đầu bằng s). Từ này gợi tả dáng đứng to lớn, đồ sộ, hiên ngang vững chãi của cây bàng.',
    spellingRule: 'Mẹo nhớ: Tả dáng vẻ vững vàng, cao lớn thường dùng s: sừng sững, sừng sộ, sừng sửng.'
  },
  {
    id: 'sp-3',
    caseNumber: 3,
    title: 'Vụ án: Bầu trời sau cơn mưa rào',
    topic: 'tr/ch',
    passage: 'Cơn mưa tạnh hẳn, bầu trời cao vời vợi, chong trẻo như được rửa sạch bụi bặm.',
    wrongWord: 'chong trẻo',
    correctWord: 'trong trẻo',
    options: [
      { id: 'opt-3-1', word: 'trong trẻo', isCorrect: true },
      { id: 'opt-3-2', word: 'chong trẻo', isCorrect: false },
      { id: 'opt-3-3', word: 'trong chẻo', isCorrect: false },
      { id: 'opt-3-4', word: 'chong chẻo', isCorrect: false }
    ],
    explanation: 'Từ đúng là "trong trẻo" (viết bằng chữ tr). "Trong trẻo" vừa gợi độ trong suốt của không gian, vừa gợi sự thanh khiết.',
    spellingRule: 'Mẹo nhớ: Từ gốc "trong" (trong vắt, trong sáng, trong veo, trong trẻo) đều bắt đầu bằng âm tr.'
  },
  {
    id: 'sp-4',
    caseNumber: 4,
    title: 'Vụ án: Tiếng suối reo giữa núi rừng',
    topic: 'd/gi/r',
    passage: 'Giữa khe núi đá hoa cương, dòng suối chảy dóc dách nghe như tiếng đàn ngân nga.',
    wrongWord: 'dóc dách',
    correctWord: 'róc rách',
    options: [
      { id: 'opt-4-1', word: 'róc rách', isCorrect: true },
      { id: 'opt-4-2', word: 'dóc dách', isCorrect: false },
      { id: 'opt-4-3', word: 'gióc giách', isCorrect: false },
      { id: 'opt-4-4', word: 'róc dách', isCorrect: false }
    ],
    explanation: 'Từ đúng là "róc rách" (bắt đầu bằng r). Đây là từ láy tượng thanh kinh điển miêu tả tiếng nước suối len lỏi chảy qua ghềnh đá.',
    spellingRule: 'Mẹo nhớ: Các từ láy mô phỏng âm thanh thiên nhiên réo rắt thường dùng âm r: róc rách, râm ran, rào rào, rì rào.'
  },
  {
    id: 'sp-5',
    caseNumber: 5,
    title: 'Vụ án: Vườn hoa hồng khoe sắc thắm',
    topic: 'dấu hỏi/dấu ngã',
    passage: 'Dưới nắng ban mai ấm áp, những đóa hoa hồng nhung xòe cánh đỏ rực rở chào ngày mới.',
    wrongWord: 'rực rở',
    correctWord: 'rực rỡ',
    options: [
      { id: 'opt-5-1', word: 'rực rỡ', isCorrect: true },
      { id: 'opt-5-2', word: 'rực rở', isCorrect: false },
      { id: 'opt-5-3', word: 'rực rợ', isCorrect: false },
      { id: 'opt-5-4', word: 'rực gỡ', isCorrect: false }
    ],
    explanation: 'Từ đúng là "rực rỡ" (mang thanh ngã ~). "Rực rỡ" gợi tả màu sắc tươi thắm, rạng ngời và tỏa sáng bắt mắt.',
    spellingRule: 'Quy tắc thanh điệu hỏi - ngã: Tiếng mang thanh Nặng (Rực) thường đi đôi với tiếng mang thanh Ngã (Rỡ) theo quy luật hòa thanh điệu: rực rỡ, rộn rã, lạnh lẽo, mạnh mẽ.'
  },
  {
    id: 'sp-6',
    caseNumber: 6,
    title: 'Vụ án: Bông hoa hướng dương đón nắng',
    topic: 'l/n',
    passage: 'Cả cánh đồng hoa hướng dương cùng lở rộ, vươn mình đón lấy ánh mặt trời chói lọi.',
    wrongWord: 'lở rộ',
    correctWord: 'nở rộ',
    options: [
      { id: 'opt-6-1', word: 'nở rộ', isCorrect: true },
      { id: 'opt-6-2', word: 'lở rộ', isCorrect: false },
      { id: 'opt-6-3', word: 'nỡ rộ', isCorrect: false },
      { id: 'opt-6-4', word: 'lở lộ', isCorrect: false }
    ],
    explanation: 'Từ đúng là "nở rộ" (bắt đầu bằng n). "Nở" là hoạt động hoa bung cánh (hoa nở), còn "lở" thường chỉ đất sạt lở.',
    spellingRule: 'Phân biệt nghĩa l/n: "Nở" (hoa nở, nụ nở) khác hoàn toàn với "Lở" (sạt lở, lở loét).'
  },
  {
    id: 'sp-7',
    caseNumber: 7,
    title: 'Vụ án: Đôi mắt tinh anh của bạn nhỏ',
    topic: 'tr/ch',
    passage: 'Bạn Lan có nụ cười hiền hậu và đôi mắt chong veo, ánh lên niềm say mê đọc sách.',
    wrongWord: 'chong veo',
    correctWord: 'trong veo',
    options: [
      { id: 'opt-7-1', word: 'trong veo', isCorrect: true },
      { id: 'opt-7-2', word: 'chong veo', isCorrect: false },
      { id: 'opt-7-3', word: 'trong theo', isCorrect: false },
      { id: 'opt-7-4', word: 'chong theo', isCorrect: false }
    ],
    explanation: 'Từ đúng là "trong veo" (viết bằng tr). "Trong veo" miêu tả đôi mắt sáng trong trẻo, không một chút vẩn đục.',
    spellingRule: 'Ghi nhớ: "Trong" (trong suốt, trong veo) viết bằng tr; còn "chong" (chong đèn, chong mắt thức) viết bằng ch.'
  },
  {
    id: 'sp-8',
    caseNumber: 8,
    title: 'Vụ án: Bài toán cần suy nghĩ kĩ càng',
    topic: 'dấu hỏi/dấu ngã',
    passage: 'Nam ngồi trầm ngâm nghãi ngợi hồi lâu trước khi viết lời giải vào vở bài tập.',
    wrongWord: 'nghãi ngợi',
    correctWord: 'nghĩ ngợi',
    options: [
      { id: 'opt-8-1', word: 'nghĩ ngợi', isCorrect: true },
      { id: 'opt-8-2', word: 'nghỉ ngợi', isCorrect: false },
      { id: 'opt-8-3', word: 'nghãi ngợi', isCorrect: false },
      { id: 'opt-8-4', word: 'nghĩ gợi', isCorrect: false }
    ],
    explanation: 'Từ đúng là "nghĩ ngợi" (tiếng nghĩ mang dấu ngã ~). "Nghĩ" chỉ hoạt động tư duy của trí óc; khác với "nghỉ" trong nghỉ ngơi.',
    spellingRule: 'Phân biệt hỏi - ngã: "Nghĩ ngợi, suy nghĩ" (dấu ngã ~) biểu thị tư duy; còn "nghỉ ngơi, nghỉ hè" (dấu hỏi ?) biểu thị dừng làm việc.'
  }
];

// ==================== TRÒ CHƠI 3: VUA TỪ LÁY & TỪ GỢI CẢM (6 THÁCH ĐẤU) ====================
export const VIVID_WORD_CHALLENGES: VividWordChallenge[] = [
  {
    id: 'vw-1',
    challengeNumber: 1,
    title: 'Tiếng mưa rơi rào rạt ngày hạ',
    category: 'Âm thanh',
    prompt: 'Chọn từ tượng thanh gợi cảm nhất để miêu tả cơn mưa rào mùa hè bất chợt đổ xuống thật to và xối xả:',
    sentenceContext: 'Mây đen kéo kín bầu trời, rồi mưa đổ xuống [...] trên mái tôn khiến ai nấy đều hối hả chạy trú mưa.',
    options: [
      {
        id: 'opt-vw-1a',
        word: 'rào rào',
        isBest: true,
        nuance: 'Diễn tả hoàn hảo âm thanh nước tuôn xối xả, ào ạt và dồn dập đặc trưng của cơn mưa rào mùa hạ.'
      },
      {
        id: 'opt-vw-1b',
        word: 'tí tách',
        isBest: false,
        nuance: 'Thường dùng cho giọt mưa xuân lất phất hoặc những giọt nước nhỏ giọt ngắt quãng, không hợp với mưa rào to.'
      },
      {
        id: 'opt-vw-1c',
        word: 'lộp độp',
        isBest: false,
        nuance: 'Chỉ tiếng vài hạt mưa to đầu tiên rớt rơi xuống lá sen hay mái hiên, chưa phải cả cơn mưa xối xả.'
      },
      {
        id: 'opt-vw-1d',
        word: 'ầm ầm',
        isBest: false,
        nuance: 'Gợi tiếng sấm nổ hoặc sóng biển đập mạnh, không dùng làm từ gợi cảm chính cho tiếng hạt mưa rơi.'
      }
    ],
    explanation: '"Rào rào" là từ tượng thanh hay nhất khi tả cơn mưa mùa hạ, gợi cảm giác ào ạt, mát lạnh sảng khoái sau chuỗi ngày nắng gắt.',
    openObservationTip: 'Tùy vào giai đoạn của cơn mưa: lúc mới bắt đầu em có thể dùng "lộp độp", lúc mưa to dùng "rào rào", và khi mưa sắp tạnh dùng "tí tách"!'
  },
  {
    id: 'vw-2',
    challengeNumber: 2,
    title: 'Màu vàng của cánh đồng lúa chín',
    category: 'Màu sắc',
    prompt: 'Từ gợi hình nào diễn tả xuất sắc nhất vẻ đẹp trù phú, no ấm và óng ả của cánh đồng lúa vào ngày mùa thu hoạch?',
    sentenceContext: 'Bước ra đầu làng, trải dài ngút tầm mắt là màu [...] của những bông lúa trĩu hạt đang nghiêng mình trước gió.',
    options: [
      {
        id: 'opt-vw-2a',
        word: 'vàng xuộm',
        isBest: true,
        nuance: 'Màu vàng đậm đà, đều khắp và tràn đầy sắc thái ấm no, bội thu của lúa đã chín rộ sẵn sàng gặt hái.'
      },
      {
        id: 'opt-vw-2b',
        word: 'vàng hoe',
        isBest: false,
        nuance: 'Thường tả sắc vàng tươi, nhạt của ánh nắng mùa đông hoặc sợi rơm khô, không gợi được sức nặng của lúa chín trĩu hạt.'
      },
      {
        id: 'opt-vw-2c',
        word: 'vàng ệch',
        isBest: false,
        nuance: 'Gợi cảm giác úa màu, mỏi mệt hoặc ố bẩn, hoàn toàn không phù hợp với cánh đồng lúa đẹp.'
      },
      {
        id: 'opt-vw-2d',
        word: 'vàng vọt',
        isBest: false,
        nuance: 'Gợi sắc thái ốm yếu, xanh xao, thiếu sức sống (ví dụ: khuôn mặt vàng vọt).'
      }
    ],
    explanation: 'Trong bài văn mẫu "Quang cảnh làng mạc ngày mùa" của nhà văn Tô Hoài, từ "vàng xuộm" được dùng để chỉ màu lúa chín ngập tràn niềm vui được mùa no ấm!',
    openObservationTip: 'Em cũng có thể quan sát: Nắng mùa đông thì "vàng hoe", quả cam chín mọng thì "vàng ươm", còn chiếc lá chuối khô thì "vàng ổi".'
  },
  {
    id: 'vw-3',
    challengeNumber: 3,
    title: 'Dáng bước đi êm ru của chú mèo con',
    category: 'Dáng vẻ',
    prompt: 'Chọn từ láy miêu tả chuẩn xác và đáng yêu nhất bước chân nhẹ như ru khi mèo con rình mồi:',
    sentenceContext: 'Phát hiện chú chuột nhắt trong góc bếp, mèo Miu khẽ [...] từng bước một, đệm thịt êm ái không hề phát ra tiếng động.',
    options: [
      {
        id: 'opt-vw-3a',
        word: 'rón rén',
        isBest: true,
        nuance: 'Gợi tả cử động cực kỳ nhẹ nhàng, cẩn trọng, từ tốn nhằm không để đối phương phát hiện.'
      },
      {
        id: 'opt-vw-3b',
        word: 'lạch bạch',
        isBest: false,
        nuance: 'Tả dáng đi chậm chạp, nặng nề, lắc lư hai bên của đàn vịt hoặc chú ngỗng mập.'
      },
      {
        id: 'opt-vw-3c',
        word: 'khệnh khạng',
        isBest: false,
        nuance: 'Tả dáng đi nghênh ngang, vênh váo, cố tỏ ra oai phong của chú gà trống hoặc bác gấu to lớn.'
      },
      {
        id: 'opt-vw-3d',
        word: 'lũn cũn',
        isBest: false,
        nuance: 'Tả vóc dáng ngắn ngủn hoặc chiếc áo quá ngắn, không miêu tả hành động bước đi rình mồi.'
      }
    ],
    explanation: '"Rón rén" là từ miêu tả thần thái đặc trưng của loài mèo khi săn mồi, bước chân đặt xuống khẽ khàng tuyệt đối nhờ lớp đệm thịt dưới chân.',
    openObservationTip: 'Khi chú mèo chạy đuổi bóng thì dùng "thoăn thoắt", khi mèo cuộn tròn ngủ thì có thể dùng "ngoan ngoãn", "lim dim".'
  },
  {
    id: 'vw-4',
    challengeNumber: 4,
    title: 'Ánh nắng ban mai tinh khôi buổi sớm',
    category: 'Ánh sáng',
    prompt: 'Từ ngữ nào diễn tả ánh ban mai ấm áp, trong trẻo chiếu rọi rực rỡ qua kẽ lá xanh mướt?',
    sentenceContext: 'Khi bình minh thức giấc, từng tia nắng sớm [...] nhảy nhót trên những giọt sương mai đọng đầu ngọn cỏ.',
    options: [
      {
        id: 'opt-vw-4a',
        word: 'lung linh',
        isBest: true,
        nuance: 'Gợi tả ánh sáng lấp lánh phản chiếu rung rinh mềm mại qua giọt sương, mang vẻ đẹp huyền ảo, tươi sáng.'
      },
      {
        id: 'opt-vw-4b',
        word: 'chói chang',
        isBest: false,
        nuance: 'Tả ánh nắng hè gay gắt, rực lửa lúc giữa trưa gây cảm giác lóa mắt, nóng nực.'
      },
      {
        id: 'opt-vw-4c',
        word: 'nhàn nhạt',
        isBest: false,
        nuance: 'Gợi ánh sáng mờ mịt, thiếu sắc thắm và tẻ nhạt, không làm nổi bật vẻ tươi tắn buổi bình minh.'
      },
      {
        id: 'opt-vw-4d',
        word: 'hắt hiu',
        isBest: false,
        nuance: 'Thường tả ngọn gió buồn bã, hiu quạnh hoặc ánh đèn leo lét sắp tàn trong đêm.'
      }
    ],
    explanation: '"Lung linh" tạo nên bức tranh thiên nhiên buổi sớm ngập tràn sức sống, ánh nắng hòa quyện cùng giọt sương như triệu viên kim cương lấp lánh.',
    openObservationTip: 'Nắng sớm dịu ngọt thì "lung linh", "ấm áp"; nắng trưa hè thì "chói chang", "gay gắt"; nắng chiều hoàng hôn thì "nhuộm vàng", "dịu nhẹ".'
  },
  {
    id: 'vw-5',
    challengeNumber: 5,
    title: 'Tiếng nước chảy qua ghềnh đá trong veo',
    category: 'Âm thanh',
    prompt: 'Chọn từ ngữ giàu cảm xúc nhất miêu tả âm thanh vui tươi, trong trẻo của dòng suối rừng:',
    sentenceContext: 'Dưới chân thác bạc, dòng nước trong vắt lách qua từng kẽ đá, reo lên [...] khúc ca của núi rừng bạt ngàn.',
    options: [
      {
        id: 'opt-vw-5a',
        word: 'róc rách',
        isBest: true,
        nuance: 'Mô phỏng âm thanh dòng nước nhỏ chảy va vào đá sỏi rất êm tai, vui tai và giàu chất nhạc.'
      },
      {
        id: 'opt-vw-5b',
        word: 'ào ào',
        isBest: false,
        nuance: 'Tả sức nước đổ xô mạnh bạo của con thác lớn hoặc sóng cuộn trào, không hợp với dòng suối lách qua kẽ đá.'
      },
      {
        id: 'opt-vw-5c',
        word: 'ì ầm',
        isBest: false,
        nuance: 'Gợi âm thanh trầm đục, vang xa và nặng nề của sấm sét hoặc thác nước cao dội xuống hồ.'
      },
      {
        id: 'opt-vw-5d',
        word: 'ríu rít',
        isBest: false,
        nuance: 'Là từ tượng thanh dành riêng cho tiếng chim non hót gọi bầy hoặc tiếng trẻ thơ trò chuyện rộn ràng.'
      }
    ],
    explanation: '"Róc rách" là từ gợi âm đặc sắc trong văn học miêu tả thiên nhiên, mang lại cảm giác thanh bình, mát lành nơi rừng sâu.',
    openObservationTip: 'Tiếng suối êm đềm là "róc rách", tiếng thác đổ hùng vĩ là "gầm vang", tiếng sóng vỗ bờ là "rì rào".'
  },
  {
    id: 'vw-6',
    challengeNumber: 6,
    title: 'Tâm trạng ngày tựu trường gặp lại thầy cô',
    category: 'Cảm xúc',
    prompt: 'Từ ngữ nào diễn tả trọn vẹn nhất niềm vui mừng, phấn khởi pha lẫn chút hồi hộp của học sinh ngày đầu năm học?',
    sentenceContext: 'Trong bộ đồng phục thơm mùi vải mới, bước chân em bước đi rộn rã với lòng [...] khôn tả khi sắp gặp lại thầy cô, bạn bè.',
    options: [
      {
        id: 'opt-vw-6a',
        word: 'náo nức',
        isBest: true,
        nuance: 'Diễn tả tâm trạng vui tươi, rạo rực, háo hức chờ đón một sự kiện trọng đại đầy ý nghĩa và niềm vui tuổi học trò.'
      },
      {
        id: 'opt-vw-6b',
        word: 'bồn chồn',
        isBest: false,
        nuance: 'Gợi cảm giác thấp thỏm, lo âu, đứng ngồi không yên vì lo lắng chuyện gì đó chưa an tâm.'
      },
      {
        id: 'opt-vw-6c',
        word: 'thờ ơ',
        isBest: false,
        nuance: 'Chỉ thái độ dửng dưng, không quan tâm, không cảm xúc, hoàn toàn trái ngược với ngày hội đến trường.'
      },
      {
        id: 'opt-vw-6d',
        word: 'bâng khuâng',
        isBest: false,
        nuance: 'Thường diễn tả nỗi niềm man mác, nhớ nhung luyến tiếc (như lúc chia tay mùa hè), chưa bộc lộ niềm vui háo hức đón chào.'
      }
    ],
    explanation: '"Náo nức" là từ ngữ giàu cảm xúc, thể hiện tinh thần phơi phới, rạng rỡ của ngày hội khai trường theo truyền thống hiếu học của dân tộc.',
    openObservationTip: 'Cảm xúc học sinh rất phong phú: Khi chờ điểm thi có thể "hồi hộp", khi chia tay bạn bè có thể "bâng khuâng", còn ngày khai trường thì luôn "náo nức"!'
  }
];

// ==================== TRÒ CHƠI 4: THỢ RÈN CÂU VĂN (4 CẤP ĐỘ) ====================
export const SENTENCE_SMITH_LEVELS: SentenceSmithLevel[] = [
  {
    id: 'ss-1',
    levelNumber: 1,
    title: 'Cấp độ 1: Rèn câu văn rõ nghĩa',
    levelName: 'Hoàn thiện nòng cốt Chủ ngữ – Vị ngữ',
    originalSentence: 'Buổi sáng trường em.',
    guidingQuestion: 'Câu trên mới chỉ có trạng ngữ thời gian và một phần sự vật, chưa rõ vị ngữ để hoàn chỉnh ý nghĩa. Em hãy viết lại thành câu có đầy đủ Chủ ngữ và Vị ngữ miêu tả sự vật hoặc hoạt động nhé!',
    targetFocus: 'Viết câu hoàn chỉnh nòng cốt: Ai/Cái gì làm gì, thế nào?',
    suggestedVocab: ['rất đông vui', 'rộn rã tiếng cười', 'khoác lên mình vẻ tươi mới', 'bừng sáng trong ánh bình minh'],
    modelResponses: [
      'Buổi sáng, trường em bừng sáng trong ánh bình minh dịu ngọt.',
      'Vào mỗi buổi sáng, sân trường em lại rộn rã tiếng cười nói của các bạn học sinh.',
      'Buổi sáng mùa thu, trường em khoác lên mình màu áo mới thật khang trang và sạch đẹp.'
    ],
    rubricCriteria: [
      { label: 'Đủ nòng cốt', description: 'Có đầy đủ bộ phận Chủ ngữ và Vị ngữ, kết thúc bằng dấu câu chuẩn.' },
      { label: 'Rõ nghĩa', description: 'Người đọc hiểu trọn vẹn thông điệp, không bị ngắt quãng cụt lủn.' },
      { label: 'Mạch lạc', description: 'Từ ngữ gắn kết tự nhiên, đúng ngữ pháp tiếng Việt.' }
    ]
  },
  {
    id: 'ss-2',
    levelNumber: 2,
    title: 'Cấp độ 2: Bổ sung chi tiết cụ thể',
    levelName: 'Thêm thời gian, không gian, màu sắc, hình dáng',
    originalSentence: 'Cây bàng đứng ở sân trường.',
    guidingQuestion: 'Câu này đã đủ nòng cốt nhưng còn đơn giản. Em thấy cây bàng có tán lá màu gì, thân cây to ra sao, và che mát cho các bạn học sinh vào thời điểm nào?',
    targetFocus: 'Mở rộng câu bằng cách thêm từ ngữ chỉ màu sắc, kích thước và công dụng che mát.',
    suggestedVocab: ['tán lá xanh mướt', 'xòe rộng như chiếc ô', 'thân cây gồ ghề', 'che bóng mát rượi', 'những trưa hè oi ả'],
    modelResponses: [
      'Nơi góc sân trường em, cây bàng cổ thụ xòe những tán lá xanh mướt che bóng mát rượi cho chúng em vui chơi.',
      'Sừng sững giữa sân trường, bác bàng già dang rộng cánh tay đầy lá biếc, mang lại không khí dịu mát trong những ngày nắng hạ.',
      'Vào mùa hè, cây bàng ở góc sân trường lại xòe tán tròn xoe như một chiếc ô khổng lồ che mát cho đàn chim ríu rít.'
    ],
    rubricCriteria: [
      { label: 'Chi tiết màu sắc/hình khối', description: 'Có từ ngữ miêu tả tán lá, thân cây hoặc bóng mát cụ thể.' },
      { label: 'Không gian/thời gian', description: 'Có định vị rõ vị trí sân trường và bối cảnh sinh động.' },
      { label: 'Diễn đạt tự nhiên', description: 'Câu mở rộng hài hòa, giàu chất miêu tả.' }
    ]
  },
  {
    id: 'ss-3',
    levelNumber: 3,
    title: 'Cấp độ 3: Dùng từ ngữ gợi hình, gợi cảm',
    levelName: 'Thổi hồn vào câu văn bằng từ láy và giác quan',
    originalSentence: 'Dòng sông chảy qua cánh đồng lúa.',
    guidingQuestion: 'Dòng nước chảy như thế nào (êm đềm, uốn lượn, lững lờ)? Mặt nước lấp lánh ra sao dưới ánh mặt trời? Em hãy thêm ít nhất một từ láy gợi hình hoặc gợi âm thanh nhé!',
    targetFocus: 'Sử dụng từ láy tượng hình, tượng thanh và từ ngữ biểu cảm giác quan.',
    suggestedVocab: ['uốn lượn mềm mại', 'lững lờ trôi', 'lấp lánh ánh bạc', 'trong veo mát rượi', 'hiền hòa', 'thì thầm phù sa'],
    modelResponses: [
      'Dòng sông quê em uốn lượn mềm mại qua cánh đồng lúa chín, mặt nước lấp lánh ánh vàng như dát bạc.',
      'Dưới ánh nắng ban mai, dòng sông hiền hòa lững lờ trôi, mang dòng phù sa màu mỡ tưới mát cho ruộng đồng xanh tốt.',
      'Con sông nhỏ thân thương uốn mình quanh co, từng làn sóng gợn lăn tăn vỗ nhẹ vào bờ bãi như lời ru thì thầm của đất mẹ.'
    ],
    rubricCriteria: [
      { label: 'Có từ láy gợi cảm', description: 'Sử dụng từ láy như mềm mại, lấp lánh, lững lờ, hiền hòa, lăn tăn...' },
      { label: 'Hình ảnh giác quan', description: 'Tác động đến thị giác (ánh sáng, sắc nước) hoặc xúc giác/thính giác.' },
      { label: 'Cảm xúc chan chứa', description: 'Bộc lộ niềm yêu quý cảnh đẹp tự nhiên một cách tự nhiên.' }
    ]
  },
  {
    id: 'ss-4',
    levelNumber: 4,
    title: 'Cấp độ 4: Sáng tạo câu văn giàu hình ảnh',
    levelName: 'Vận dụng phép tu từ So sánh & Nhân hóa tinh tế',
    originalSentence: 'Cây phượng nở hoa đỏ rực.',
    guidingQuestion: 'Những chùm hoa phượng đỏ rực rỡ gợi cho em liên tưởng đến điều gì kỳ diệu? (Như đốm lửa ấm, chiếc ô hoa rực rỡ, hay lời báo hiệu mùa hè náo nức?). Hãy thử kết hợp so sánh hoặc nhân hóa cây phượng nhé!',
    targetFocus: 'Sáng tạo câu văn đỉnh cao với nghệ thuật so sánh ("như", "tựa như") hoặc nhân hóa ("chị phượng", "bác phượng thắp lửa").',
    suggestedVocab: ['như những đốm lửa bập bùng', 'thắp sáng cả một góc trời', 'chiếc ô hoa đỏ rực', 'bác phượng già vẫy gọi mùa hè', 'tiếng ve rộn rã'],
    modelResponses: [
      'Khi tiếng ve cất tiếng hát đầu hè, cây phượng già giữa sân trường bung nở từng chùm hoa đỏ rực như những đốm lửa bập bùng thắp sáng cả khoảng trời tuổi thơ.',
      'Bác phượng già nơi góc sân khoác lên mình chiếc áo hoa đỏ thắm, rung rinh cành lá như đang vẫy chào những ngày hè sôi động của chúng em.',
      'Từng chùm hoa phượng nở bung đỏ rực tựa như hàng ngàn cánh bướm thắm đang say sưa múa lượn dưới vòm trời xanh biếc.'
    ],
    rubricCriteria: [
      { label: 'Phép so sánh / nhân hóa', description: 'Có từ so sánh (như, tựa như, giống như) hoặc cách gọi/gán hành động người cho cây cối.' },
      { label: 'Trí tưởng tượng bay bổng', description: 'Hình ảnh liên tưởng độc đáo, bất ngờ và giàu xúc cảm.' },
      { label: 'Nhịp điệu câu văn', description: 'Câu văn có âm hưởng ngân vang, lưu loát, giàu nhạc điệu.' }
    ]
  }
];

// ==================== HUY HIỆU DANH DỰ (4 HUY HIỆU) ====================
export const CHALLENGE_BADGES: ChallengeBadge[] = [
  {
    id: 'badge-builder',
    name: 'Nhà Xây Câu',
    title: 'Huy hiệu: Nhà Xây Câu Tài Ba 🌉',
    description: 'Chinh phục trọn vẹn 6 vòng chơi của "Xây Câu Thần Tốc", sắp xếp câu văn chuẩn mực ngữ pháp.',
    icon: '🌉',
    color: 'emerald',
    gameId: 'sentence-builder',
    requiredCount: 6
  },
  {
    id: 'badge-detective',
    name: 'Thám Tử Chính Tả',
    title: 'Huy hiệu: Thám Tử Chính Tả Nhí 🔍',
    description: 'Phá án thành công cả 8 vụ án chính tả khó nhằn: l/n, s/x, tr/ch, d/gi/r và dấu hỏi ngã.',
    icon: '🔍',
    color: 'sky',
    gameId: 'spelling-detective',
    requiredCount: 8
  },
  {
    id: 'badge-vivid',
    name: 'Vua Từ Ngữ',
    title: 'Huy hiệu: Vua Từ Láy & Từ Gợi Cảm 👑',
    description: 'Vượt qua 6 thách đấu chọn từ ngữ đỉnh cao, am hiểu sâu sắc các tầng ý nghĩa của Tiếng Việt.',
    icon: '👑',
    color: 'amber',
    gameId: 'vivid-words',
    requiredCount: 6
  },
  {
    id: 'badge-smith',
    name: 'Nghệ Nhân Câu Văn',
    title: 'Huy hiệu: Nghệ Nhân Rèn Giũa Câu Văn ⚒️',
    description: 'Hoàn thành xuất sắc 4 cấp độ tôi luyện câu văn đơn giản thành tuyệt phẩm giàu hình ảnh nghệ thuật.',
    icon: '⚒️',
    color: 'rose',
    gameId: 'sentence-smith',
    requiredCount: 4
  }
];

// Helper to get initial state
export function getInitialChallengeProgress(userId: string) {
  return {
    userId,
    games: {
      'sentence-builder': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      },
      'spelling-detective': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      },
      'vivid-words': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      },
      'sentence-smith': {
        completedRoundIds: [],
        scoresByRound: {},
        hintsUsedByRound: {},
        totalPoints: 0
      }
    },
    totalPoints: 0,
    earnedBadgeIds: [],
    lastUpdated: new Date().toISOString()
  };
}
