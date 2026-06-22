(define-data-var proof-count uint u0)

(define-map proofs
  { builder: principal }
  {
    memo: (string-ascii 120)
  }
)

(define-public (log-proof (memo (string-ascii 120)))
  (begin
    (var-set proof-count (+ (var-get proof-count) u1))
    (map-set proofs
      { builder: tx-sender }
      {
        memo: memo
      }
    )
    (ok (var-get proof-count))
  )
)

(define-read-only (get-proof (builder principal))
  (map-get? proofs { builder: builder })
)

(define-read-only (get-proof-count)
  (ok (var-get proof-count))
)
