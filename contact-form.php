<?php
// フォームが送信された場合のみ処理
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // フォームデータの取得とサニタイズ
    $name = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8');
    $company = htmlspecialchars(trim($_POST['company']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');
    
    // 必須項目のチェック
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => '必須項目を入力してください。']);
        exit;
    }
    
    // メールアドレスの形式チェック
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => '有効なメールアドレスを入力してください。']);
        exit;
    }
    
    // 件名の設定
    $subject_options = [
        'service' => 'サービスについて',
        'estimate' => 'お見積もり',
        'support' => 'サポート',
        'other' => 'その他'
    ];
    $subject_text = isset($subject_options[$subject]) ? $subject_options[$subject] : 'その他';
    
    // メール送信先
    $to = 'support@osara-rock.com';
    $mail_subject = '【お問い合わせ】' . $subject_text . ' - ' . $name . '様';
    
    // メール本文の作成
    $mail_body = "お問い合わせをいただき、ありがとうございます。\n\n";
    $mail_body .= "【お問い合わせ内容】\n";
    $mail_body .= "お名前: " . $name . "\n";
    $mail_body .= "会社名: " . ($company ?: '(未入力)') . "\n";
    $mail_body .= "メールアドレス: " . $email . "\n";
    $mail_body .= "お問い合わせ種別: " . $subject_text . "\n";
    $mail_body .= "お問い合わせ内容:\n" . $message . "\n\n";
    $mail_body .= "---\n";
    $mail_body .= "このメールは株式会社オサラロックのWebサイトから送信されました。\n";
    $mail_body .= "送信日時: " . date('Y年m月d日 H:i:s') . "\n";
    
    // メールヘッダーの設定
    $headers = array();
    $headers[] = 'From: noreply@osara-rock.com';
    $headers[] = 'Reply-To: ' . $email;
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    
    // 管理者宛メール送信
    $admin_mail_sent = mail($to, $mail_subject, $mail_body, implode("\r\n", $headers));
    
    // お客様宛自動応答メール
    $customer_subject = '【お問い合わせ受付完了】株式会社オサラロック';
    $customer_body = $name . "様\n\n";
    $customer_body .= "この度は、株式会社オサラロックにお問い合わせいただき、誠にありがとうございます。\n\n";
    $customer_body .= "お問い合わせを受け付けました。\n";
    $customer_body .= "担当者が内容を確認させていただき、ご回答いたしますので、少々お待ちください。\n\n";
    $customer_body .= "なお、ご回答までに2-3営業日程度お時間をいただく場合がございます。\n";
    $customer_body .= "お急ぎの場合は、お電話（070-1327-6907）にてお問い合わせください。\n\n";
    $customer_body .= "【お問い合わせ内容】\n";
    $customer_body .= "お名前: " . $name . "\n";
    $customer_body .= "会社名: " . ($company ?: '(未入力)') . "\n";
    $customer_body .= "メールアドレス: " . $email . "\n";
    $customer_body .= "お問い合わせ種別: " . $subject_text . "\n";
    $customer_body .= "お問い合わせ内容:\n" . $message . "\n\n";
    $customer_body .= "---\n";
    $customer_body .= "株式会社オサラロック\n";
    $customer_body .= "〒330-0063 埼玉県さいたま市中央区下落合1088-3\n";
    $customer_body .= "TEL: 070-1327-6907\n";
    $customer_body .= "Email: support@osara-rock.com\n";
    $customer_body .= "※このメールは自動送信されています。\n";
    
    // お客様宛メールヘッダー
    $customer_headers = array();
    $customer_headers[] = 'From: support@osara-rock.com';
    $customer_headers[] = 'Reply-To: support@osara-rock.com';
    $customer_headers[] = 'X-Mailer: PHP/' . phpversion();
    $customer_headers[] = 'Content-Type: text/plain; charset=UTF-8';
    
    // お客様宛メール送信
    $customer_mail_sent = mail($email, $customer_subject, $customer_body, implode("\r\n", $customer_headers));
    
    // 結果判定
    if ($admin_mail_sent && $customer_mail_sent) {
        echo json_encode(['success' => true, 'message' => 'お問い合わせを受け付けました。担当者が回答いたしますので、少々お待ちください。確認メールをお送りしましたのでご確認ください。']);
    } elseif ($admin_mail_sent) {
        echo json_encode(['success' => true, 'message' => 'お問い合わせを受け付けました。担当者が回答いたしますので、少々お待ちください。']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'メールの送信に失敗しました。恐れ入りますが、しばらく時間をおいて再度お試しください。']);
    }
} else {
    // POSTリクエスト以外の場合
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => '不正なリクエストです。']);
}
?>